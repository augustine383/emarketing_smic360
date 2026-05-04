# **App Name**: TemplateVault

## Core Features:

- PIN-gated Access: Secure client-side access control requiring a 7-digit PIN. The PIN and user's saved templates are stored and retrieved from the browser's local storage for a stateless MVP.
- Dashboard & Template Management: A responsive, modern dashboard displaying a grid or card layout for 5 distinct email templates. This provides an intuitive interface for managing email content.
- Live HTML Preview & Editing: Each template card includes a scrollable HTML preview area. Users can switch to an editable textarea to modify the raw HTML of a selected template directly within the application.
- Client-Side Persistence: Templates edited by the user are automatically saved to local storage upon modification or an explicit save action, ensuring changes persist across sessions and browser refreshes.
- Content Action Tools: Buttons for 'Copy HTML' (copies raw content to clipboard with a toast notification), 'Save', and 'Reset' (reverts to the original default template content, overwriting local storage).
- AI Template Refinement Tool: Leverage a generative AI model to suggest improvements, optimize for readability, or generate slight variations for a selected email template, based on the existing HTML content.
- Template Search and Filter: An integrated search and filter functionality to quickly locate specific templates by title or content keywords, enhancing navigation for larger template collections.

## Style Guidelines:

- Color scheme: Dark. Primary color: A muted, premium gold-amber (#CCB94D) to signify quality and warmth against a dark background. Background color: A deep, subtly warm charcoal (#1F1C17) providing a rich and minimalist canvas. Accent color: A vibrant, slightly orange-red (#E87E46) to highlight interactive elements and calls to action, chosen for an analogous and contrasting effect.
- Body and headline font: 'Inter', a grotesque-style sans-serif for its modern, clean, and objective aesthetic, ensuring excellent readability across all text sizes. This choice supports the minimal and premium design vision.
- Utilize clean, outline-style icons from a modern library (e.g., Lucide or Feather Icons) to maintain the minimalist and premium feel. Icons should clearly represent actions like 'copy', 'edit', 'save', and 'reset' without clutter.
- The layout features ample clean spacing and a modular grid or card system for templates, ensuring visual separation and hierarchy. Content areas, including the HTML preview and editable textarea, will maximize screen real estate efficiently. Emphasis on responsive design to adapt seamlessly across various screen sizes.
- Incorporate subtle, tasteful animations for smooth user feedback. This includes fade-in/fade-out transitions for notifications (e.g., 'Copied!'), gentle hover effects on interactive elements, and seamless transitions when switching between template preview and edit modes, enhancing the overall user experience without being distracting.