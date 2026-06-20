/**
 * Gmail-compatible HTML email transformation.
 *
 * Gmail strips <style> blocks, <link> tags, <head>, <meta>, <title>, and most
 * CSS that isn't inline. This module converts class-based template HTML into
 * a flat structure with only inline styles that Gmail respects.
 */

const GMAIL_SAFE_PROPS = [
  'color', 'background-color', 'font-size', 'font-family', 'font-weight',
  'font-style', 'padding', 'padding-top', 'padding-right', 'padding-bottom',
  'padding-left', 'margin', 'margin-top', 'margin-right', 'margin-bottom',
  'margin-left', 'border', 'border-top', 'border-bottom', 'border-left',
  'border-right', 'width', 'max-width', 'height', 'text-align',
  'vertical-align', 'line-height', 'letter-spacing', 'text-transform',
  'text-decoration', 'display', 'white-space', 'word-spacing',
];

const UNSUPPORTED_PROPS =
  /(?:box-shadow|border-radius|overflow|position|float|clear|object-fit|background-image|background-size|background-repeat|background-attachment|opacity|transform|transition|animation|z-index|cursor|outline|resize|visibility|clip-path|filter|backdrop-filter|justify-content|align-items|flex[^\s;]*)\s*:[^;]*/gi;

const UNSUPPORTED_VALUES =
  /(?:linear-gradient|radial-gradient|var\([^)]+\)|calc\([^)]+\))/gi;

function extractCssRules(css: string): Array<{ selector: string; body: string }> {
  const rules: Array<{ selector: string; body: string }> = [];
  const blockRe = /([^{]+)\{([^}]+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(css)) !== null) {
    const selector = m[1].trim();
    const body = m[2].trim();
    if (
      !selector.startsWith('@') &&
      !selector.startsWith('*') &&
      selector !== 'body' &&
      selector !== 'html' &&
      !selector.startsWith('a') &&
      body.length > 0
    ) {
      rules.push({ selector, body });
    }
  }
  return rules;
}

function resolveFontFamily(body: string): string {
  return body.replace(
    /font-family\s*:\s*[^;]+/gi,
    (match) => {
      if (/cormorant|garamond/i.test(match)) {
        return "font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif";
      }
      if (/dm.sans/i.test(match)) {
        return "font-family: 'DM Sans', Arial, Helvetica, sans-serif";
      }
      return match;
    }
  );
}

function cleanInlineStyle(style: string): string {
  let cleaned = style
    .replace(UNSUPPORTED_PROPS, '')
    .replace(UNSUPPORTED_VALUES, 'transparent')
    .replace(/!important/gi, '')
    .replace(/border-radius\s*:\s*[^;]+;?/gi, '')
    .replace(/text-decoration\s*:\s*none;?/gi, '')
    .replace(/background\s*:\s*[^;]*(?:linear-gradient|radial-gradient)[^;]*/gi, '')
    .replace(/background-color\s*:\s*transparent;?/gi, '')
    .replace(/;\s*;/g, ';')
    .replace(/^\s*;\s*/, '')
    .replace(/\s*;\s*$/, '')
    .trim();
  return cleaned;
}

function applyInlineStyles(
  html: string,
  rules: Array<{ selector: string; body: string }>
): string {
  const classRe = /class="([^"]*)"/g;
  return html.replace(classRe, (_match, classList: string) => {
    const classes = classList.split(/\s+/);
    const styles: string[] = [];
    for (const cls of classes) {
      for (const rule of rules) {
        const selectors = rule.selector.split(',').map((s) => s.trim());
        for (const sel of selectors) {
          if (sel === `.${cls}` || sel.endsWith(` .${cls}`) || sel.endsWith(`>.${cls}`)) {
            const resolved = resolveFontFamily(rule.body);
            const cleaned = cleanInlineStyle(resolved);
            if (cleaned.length > 0) {
              styles.push(cleaned);
            }
          }
        }
      }
    }
    return styles.length > 0 ? `style="${styles.join(' ')}"` : '';
  });
}

function convertDivsToTables(html: string): string {
  const cardPattern =
    /<div\s+style="([^"]*background-color[^"]*)"[^>]*>([\s\S]*?)<\/div>/gi;
  return html.replace(cardPattern, (_m, style: string, inner: string) => {
    return `<table width="100%" border="0" cellpadding="0" cellspacing="0" style="${style}"><tr><td>${inner.trim()}</td></tr></table>`;
  });
}

function stripHeadAndStyles(html: string): string {
  let result = html;
  result = result.replace(/<!DOCTYPE[^>]*>/gi, '');
  result = result.replace(/<html[^>]*>/gi, '');
  result = result.replace(/<\/html>/gi, '');
  result = result.replace(/<head[\s\S]*?<\/head>/gi, '');
  result = result.replace(/<meta[^>]*>/gi, '');
  result = result.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '');
  result = result.replace(/<link[^>]*>/gi, '');
  result = result.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  result = result.replace(/<!--[\s\S]*?-->/g, '');
  result = result.replace(/\s{2,}/g, ' ');
  return result.trim();
}

function stripClassAttributes(html: string): string {
  return html.replace(/\s+class="[^"]*"/gi, '');
}

/**
 * Transform a full HTML email template into a Gmail-safe version.
 *
 * - Strips <head>, <style>, <link>, <meta>, <title>, <!DOCTYPE>, <html>
 * - Inlines CSS from <style> blocks onto matching elements
 * - Strips unsupported CSS (gradients, border-radius, float, position, etc.)
 * - Converts div layouts to tables for Gmail compatibility
 * - Adds web-safe font fallbacks
 * - Removes class attributes
 */
export function toGmailHtml(fullHtml: string): string {
  let css = '';
  const styleMatch = fullHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (styleMatch) {
    css = styleMatch[1];
  }

  const rules = extractCssRules(css);

  let result = applyInlineStyles(fullHtml, rules);

  result = stripHeadAndStyles(result);

  result = convertDivsToTables(result);

  result = stripClassAttributes(result);

  result = result.replace(/\s{2,}/g, ' ').trim();

  return result;
}
