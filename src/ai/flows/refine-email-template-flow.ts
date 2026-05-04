'use server';
/**
 * @fileOverview This file implements a Genkit flow for refining email templates using AI.
 *
 * - refineEmailTemplate - A function that refines an HTML email template.
 * - RefineEmailTemplateInput - The input type for the refineEmailTemplate function.
 * - RefineEmailTemplateOutput - The return type for the refineEmailTemplate function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RefineEmailTemplateInputSchema = z.object({
  htmlContent: z.string().describe('The raw HTML content of the email template to be refined.'),
});
export type RefineEmailTemplateInput = z.infer<typeof RefineEmailTemplateInputSchema>;

const RefineEmailTemplateOutputSchema = z.object({
  refinedHtmlContent: z
    .string()
    .describe('The AI-suggested improved, optimized, or varied HTML content for the email template.'),
});
export type RefineEmailTemplateOutput = z.infer<typeof RefineEmailTemplateOutputSchema>;

export async function refineEmailTemplate(input: RefineEmailTemplateInput): Promise<RefineEmailTemplateOutput> {
  return refineEmailTemplateFlow(input);
}

const refineEmailTemplatePrompt = ai.definePrompt({
  name: 'refineEmailTemplatePrompt',
  input: { schema: RefineEmailTemplateInputSchema },
  output: { schema: RefineEmailTemplateOutputSchema },
  prompt: `You are an expert email template designer and optimizer.
Your task is to review the provided HTML email template and suggest improvements, optimize it for readability, or generate slight variations to enhance its quality and effectiveness.
Return ONLY the complete, refined HTML content within the 'refinedHtmlContent' field of the JSON output.
Do not include any additional text or commentary outside of the JSON.

Here is the original HTML email template:

HTML Content: {{{htmlContent}}}`,
});

const refineEmailTemplateFlow = ai.defineFlow(
  {
    name: 'refineEmailTemplateFlow',
    inputSchema: RefineEmailTemplateInputSchema,
    outputSchema: RefineEmailTemplateOutputSchema,
  },
  async (input) => {
    const { output } = await refineEmailTemplatePrompt(input);
    if (!output) {
      throw new Error('Failed to refine email template: No output from AI model.');
    }
    return output;
  }
);
