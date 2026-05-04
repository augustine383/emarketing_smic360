'use server';
/**
 * @fileOverview A Genkit flow that generates an HTML email template based on a text prompt.
 *
 * - generateEmailTemplate - A function that handles the email template generation process.
 * - GenerateEmailTemplateInput - The input type for the generateEmailTemplate function.
 * - GenerateEmailTemplateOutput - The return type for the generateEmailTemplate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmailTemplateInputSchema = z
  .string()
  .describe('A text prompt describing the purpose and content of the email template.');
export type GenerateEmailTemplateInput = z.infer<typeof GenerateEmailTemplateInputSchema>;

const GenerateEmailTemplateOutputSchema = z
  .string()
  .describe('The generated HTML email template.');
export type GenerateEmailTemplateOutput = z.infer<typeof GenerateEmailTemplateOutputSchema>;

export async function generateEmailTemplate(
  input: GenerateEmailTemplateInput
): Promise<GenerateEmailTemplateOutput> {
  return generateEmailTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmailTemplatePrompt',
  input: {schema: GenerateEmailTemplateInputSchema},
  output: {schema: GenerateEmailTemplateOutputSchema},
  prompt: `You are an expert HTML email template designer. Your task is to create a clean, responsive, and modern HTML email template based on the user's description.

The email template should be full HTML, including necessary head, body, and styling for cross-client compatibility. Use inline CSS or embedded <style> tags as appropriate. The template should be ready to use.

Description: {{{this}}}`,
});

const generateEmailTemplateFlow = ai.defineFlow(
  {
    name: 'generateEmailTemplateFlow',
    inputSchema: GenerateEmailTemplateInputSchema,
    outputSchema: GenerateEmailTemplateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate email template.');
    }
    return output;
  }
);
