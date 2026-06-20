
export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'textarea';
  placeholder?: string;
}

export interface TemplateFieldGroup {
  name: string;
  fields: TemplateField[];
}

export interface EmailTemplate {
  id: string;
  title: string;
  category: string;
  fieldGroups: TemplateFieldGroup[];
  values: Record<string, string>;
  html: string;
}

const LOGO_URL = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg";

const SMIC = {
  bg: '#050505',
  card: '#0C0C0C',
  gold: '#C9963A',
  goldLight: '#E8C06A',
  text: '#F5F0E8',
  muted: '#888',
  dim: '#555',
  border: 'rgba(201,150,58,0.15)',
  borderLight: 'rgba(201,150,58,0.1)',
  address: '1st Floor, Verostina House, Opp. DSTV Office, Community 18, Off Spintex Road, Accra, Ghana',
  phone: '+233 20 336 1155 | +233 30 292 5478',
  email: 'christie@smic360.com',
  website: 'smic360.com',
  tagline: 'Building Foundations. Branding Futures. Connecting Markets.',
};

function renderSeal(): string {
  const now = new Date();
  const ts = now.toISOString().replace('T', ' ').replace(/\.\d+Z/, ' UTC');
  const id = `SMIC-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  return `<div style="margin-top:40px;padding:20px 28px;background:#0C0C0C;border:1px solid rgba(201,150,58,0.12);text-align:center;font-family:'DM Sans',Arial,sans-serif;">
  <img src="${LOGO_URL}" alt="SMIC360" style="width:32px;height:32px;border-radius:4px;display:inline-block;vertical-align:middle;margin-right:8px;border:1px solid rgba(201,150,58,0.2);">
  <span style="font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;font-weight:700;color:#C9A84C;vertical-align:middle;letter-spacing:0.5px;">SMIC360</span>
  <span style="font-size:10px;color:#555;vertical-align:middle;margin-left:6px;letter-spacing:1px;">LIMITED</span>
  <div style="margin-top:10px;font-size:9px;color:#444;letter-spacing:1.5px;text-transform:uppercase;">
    <a href="https://smic360.com" style="color:#C9A84C;text-decoration:none;">smic360.com</a>
    &nbsp;&middot;&nbsp; Generated from SMIC360 Vault
  </div>
  <div style="margin-top:6px;font-size:8px;color:#333;letter-spacing:1px;font-family:monospace;">
    ${id} &nbsp;&middot;&nbsp; ${ts}
  </div>
</div>`;
}

function injectSeal(html: string): string {
  return html.replace(/<\/body>\s*<\/html>\s*$/i, `${renderSeal()}</body></html>`);
}

const HEAD = `<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400&family=DM+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">`;

const BASE_CSS = `body{margin:0;padding:0;background:${SMIC.bg};font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased}`;
const CARD = `max-width:600px;margin:0 auto;background:${SMIC.card};border:1px solid ${SMIC.border};overflow:hidden`;
const GOLD_BTN = `display:inline-block;background:linear-gradient(135deg,${SMIC.gold},${SMIC.goldLight});color:#080808;padding:16px 40px;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase`;
const FOOTER = `padding:30px;text-align:center;color:#444;font-size:10px;letter-spacing:0.1em;border-top:1px solid ${SMIC.borderLight}`;

function footer(text?: string) {
  return `<div style="${FOOTER}">&copy; ${text || '2026 SMIC360 Limited. All rights reserved.'}</div>`;
}

function logoBlock(w = 80, mb = 20) {
  return `<img src="${LOGO_URL}" alt="SMIC360" style="width:${w}px;height:${w}px;border-radius:6%;margin-bottom:${mb}px;border:1px solid ${SMIC.border}">`;
}

function goldBar(text: string) {
  return `<div style="background:linear-gradient(135deg,${SMIC.gold},${SMIC.goldLight});padding:10px;text-align:center;font-size:10px;font-weight:700;letter-spacing:0.3em;color:#080808;text-transform:uppercase">${text}</div>`;
}

// ─── TEMPLATES ───────────────────────────────────────────────────────────────

export const DEFAULT_TEMPLATES: EmailTemplate[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERAL
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'welcome',
    title: 'Client Welcome',
    category: 'General',
    fieldGroups: [
      { name: 'Client Info', fields: [
        { key: 'clientName', label: 'Client Name', type: 'text', placeholder: 'e.g. Mr. Kwame Mensah' },
        { key: 'projectType', label: 'Project Type', type: 'text', placeholder: 'e.g. Branding & Campaign Execution' },
      ]},
      { name: 'Message', fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'Welcome to the SMIC360 Family' },
        { key: 'body', label: 'Body Text', type: 'textarea', placeholder: 'Personal welcome message...' },
      ]},
      { name: 'Call to Action', fields: [
        { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'e.g. Book Your Consultation' },
        { key: 'ctaUrl', label: 'Button Link', type: 'text', placeholder: 'https://...' },
      ]},
    ],
    values: {
      clientName: 'Valued Client',
      projectType: 'Strategic Partnership',
      heading: 'Welcome to the <em>SMIC360 Family</em>',
      body: 'Thank you for choosing SMIC360 Limited as your business solutions partner. With over two decades of experience across Marketing, Real Estate, and Procurement, we are committed to engineering growth and delivering measurable results for your organisation.',
      cta: 'Book Your Consultation',
      ctaUrl: 'https://smic360.com/contact/',
    },
    html: '',
  },

  {
    id: 'invoice',
    title: 'Invoice',
    category: 'General',
    fieldGroups: [
      { name: 'Invoice Details', fields: [
        { key: 'invoiceNumber', label: 'Invoice Number', type: 'text', placeholder: 'e.g. INV-2026-0041' },
        { key: 'invoiceDate', label: 'Invoice Date', type: 'text', placeholder: 'e.g. June 20, 2026' },
        { key: 'clientName', label: 'Client Name', type: 'text', placeholder: 'e.g. Ghana National Petroleum Corporation' },
      ]},
      { name: 'Line Items', fields: [
        { key: 'item1', label: 'Item 1 Description', type: 'text', placeholder: 'e.g. 360° Brand Strategy & Corporate Identity' },
        { key: 'item1Amount', label: 'Item 1 Amount', type: 'text', placeholder: 'e.g. GH₵ 45,000.00' },
        { key: 'item2', label: 'Item 2 Description', type: 'text', placeholder: 'e.g. Digital Marketing Campaign (3 months)' },
        { key: 'item2Amount', label: 'Item 2 Amount', type: 'text', placeholder: 'e.g. GH₵ 28,500.00' },
        { key: 'item3', label: 'Item 3 Description', type: 'text', placeholder: 'e.g. Media Buying — OOH & Radio' },
        { key: 'item3Amount', label: 'Item 3 Amount', type: 'text', placeholder: 'e.g. GH₵ 15,000.00' },
        { key: 'total', label: 'Total Amount', type: 'text', placeholder: 'e.g. GH₵ 88,500.00' },
      ]},
      { name: 'Payment', fields: [
        { key: 'dueDate', label: 'Payment Due', type: 'text', placeholder: 'e.g. July 20, 2026' },
        { key: 'bankDetails', label: 'Bank Details', type: 'textarea', placeholder: 'Bank name, account number, sort code...' },
      ]},
    ],
    values: {
      invoiceNumber: 'INV-2026-0041',
      invoiceDate: 'June 20, 2026',
      clientName: 'Client Name',
      item1: '360° Brand Strategy & Corporate Identity',
      item1Amount: 'GH₵ 45,000.00',
      item2: 'Digital Marketing Campaign (3 months)',
      item2Amount: 'GH₵ 28,500.00',
      item3: 'Media Buying — OOH & Radio',
      item3Amount: 'GH₵ 15,000.00',
      total: 'GH₵ 88,500.00',
      dueDate: 'July 20, 2026',
      bankDetails: 'Standard Chartered Bank\nAccount Name: SMIC360 Limited\nAccount Number: 0123456789\nSort Code: 050110',
    },
    html: '',
  },

  {
    id: 'company-profile',
    title: 'Company Profile',
    category: 'General',
    fieldGroups: [
      { name: 'Headline', fields: [
        { key: 'headline', label: 'Gold Band Headline', type: 'text', placeholder: 'e.g. Ghana\'s Most Trusted 360° Brand Agency' },
      ]},
      { name: 'Who We Are', fields: [
        { key: 'whoHeading', label: 'Section Heading', type: 'text', placeholder: 'e.g. Your Brand\'s Growth Partner' },
        { key: 'whoBody1', label: 'History Paragraph', type: 'textarea', placeholder: 'Company history...' },
        { key: 'whoBody2', label: 'Values Paragraph', type: 'textarea', placeholder: 'Company values...' },
      ]},
      { name: 'Vision & Mission', fields: [
        { key: 'vision', label: 'Vision', type: 'textarea', placeholder: 'Company vision...' },
        { key: 'mission', label: 'Mission', type: 'textarea', placeholder: 'Company mission...' },
      ]},
      { name: 'Call to Action', fields: [
        { key: 'ctaHeading', label: 'CTA Heading', type: 'text', placeholder: 'e.g. Ready to Elevate Your Brand?' },
        { key: 'ctaSubtext', label: 'CTA Subtext', type: 'text', placeholder: 'e.g. Let\'s create something unforgettable.' },
      ]},
    ],
    values: {
      headline: "Ghana\u2019s Most Trusted 360\u00b0 Brand Agency \u2014 Delivering Real Results Since 2006",
      whoHeading: "Your Brand\u2019s Growth Partner",
      whoBody1: "Formerly Meshan-Ad Consult, SMIC360 was registered in 2006 and began formal operations in April 2009 \u2014 growing from a sole proprietorship into a fully incorporated Limited Liability Company in 2011.",
      whoBody2: "We are built on the passion to offer efficient, sustainable solutions \u2014 treating every client, staff member and supplier like family.",
      vision: "To become the Preferred Advertising Agency in Ghana and Beyond.",
      mission: "To provide quality, effective Advertising, Media and PR while investing in our people and using up-to-date technology.",
      ctaHeading: "Ready to Elevate Your Brand?",
      ctaSubtext: "Let\u2019s create something your audience will never forget.",
    },
    html: '',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADVERTISING & MARKETING
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'campaign-proposal',
    title: 'Campaign Proposal',
    category: 'Advertising',
    fieldGroups: [
      { name: 'Client', fields: [
        { key: 'clientName', label: 'Client Name', type: 'text', placeholder: 'e.g. MTN Ghana' },
        { key: 'projectName', label: 'Project Name', type: 'text', placeholder: 'e.g. Q3 Digital Brand Campaign' },
      ]},
      { name: 'Proposal', fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'e.g. Your Campaign Blueprint' },
        { key: 'body', label: 'Overview', type: 'textarea', placeholder: 'Describe the campaign strategy...' },
      ]},
      { name: 'Deliverables', fields: [
        { key: 'deliverables', label: 'Key Deliverables', type: 'textarea', placeholder: 'List deliverables...' },
      ]},
      { name: 'Call to Action', fields: [
        { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'e.g. Approve Proposal' },
        { key: 'ctaUrl', label: 'Button Link', type: 'text', placeholder: 'https://...' },
      ]},
    ],
    values: {
      clientName: 'Client Name',
      projectName: 'Campaign Project',
      heading: 'Your <em>Campaign</em> Blueprint',
      body: 'At SMIC360, we create campaigns that get results. From brand strategy to media buying, OOH, radio, and digital — we build full-funnel advertising that drives real, measurable outcomes. Below is our tailored approach for your organisation.',
      deliverables: 'Brand Strategy & Positioning Document\nCreative Concept & Visual Identity\nMedia Plan — OOH, Radio, Print & Digital\nCampaign Execution & Monitoring\nPerformance Report & Optimisation',
      cta: 'Approve Proposal',
      ctaUrl: '#',
    },
    html: '',
  },

  {
    id: 'newsletter',
    title: 'Monthly Newsletter',
    category: 'Advertising',
    fieldGroups: [
      { name: 'Issue', fields: [
        { key: 'issue', label: 'Issue Label', type: 'text', placeholder: 'e.g. Issue #12 • June 2026' },
        { key: 'intro', label: 'Introduction', type: 'textarea', placeholder: 'Opening paragraph...' },
      ]},
      { name: 'Article 1', fields: [
        { key: 'a1Tag', label: 'Category Tag', type: 'text', placeholder: 'e.g. Marketing Insight' },
        { key: 'a1Title', label: 'Article Title', type: 'text', placeholder: 'e.g. 5 Brand Strategy Mistakes to Avoid' },
        { key: 'a1Excerpt', label: 'Excerpt', type: 'textarea', placeholder: 'Brief summary...' },
      ]},
      { name: 'Article 2', fields: [
        { key: 'a2Tag', label: 'Category Tag', type: 'text', placeholder: 'e.g. Real Estate' },
        { key: 'a2Title', label: 'Article Title', type: 'text', placeholder: 'e.g. Why Phoenix Enclave Is Selling Fast' },
        { key: 'a2Excerpt', label: 'Excerpt', type: 'textarea', placeholder: 'Brief summary...' },
      ]},
      { name: 'Highlight', fields: [
        { key: 'highlight', label: 'Featured Section', type: 'textarea', placeholder: 'Featured project, win, or announcement...' },
      ]},
    ],
    values: {
      issue: 'Issue #12 • June 2026',
      intro: 'Welcome to the latest edition of SMIC360 Insights. This month we explore brand strategy lessons from our recent campaigns, share exciting updates from The Phoenix Enclave, and highlight a milestone project completion.',
      a1Tag: 'Marketing Insight',
      a1Title: '5 Brand Strategy Mistakes <em>Ghanaian Businesses</em> Make',
      a1Excerpt: 'Brand-building in Ghana\'s fast-moving market demands more than a logo and tagline. Here are the five most common pitfalls — and the strategic fixes that move the needle.',
      a2Tag: 'Real Estate Update',
      a2Title: 'The Phoenix Enclave — <em>Phase II</em> Now Open',
      a2Excerpt: 'Phase I delivered 24 units. Phase II is now accepting reservations. Discover modern gated community living on Spintex Road, Accra.',
      highlight: 'PROJECT SPOTLIGHT: Sigma Air Conditioners — We recently completed a multi-channel brand awareness campaign introducing Sigma to the Ghanaian market, spanning OOH, BTL activations, and events for Platinum Impex.',
    },
    html: '',
  },

  {
    id: 'brand-strategy-pitch',
    title: 'Brand Strategy Pitch',
    category: 'Advertising',
    fieldGroups: [
      { name: 'Client', fields: [
        { key: 'clientName', label: 'Client Name', type: 'text', placeholder: 'e.g. Cummins Ghana' },
        { key: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g. Power Solutions' },
      ]},
      { name: 'Strategy', fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'e.g. Your Brand Transformation' },
        { key: 'challenge', label: 'The Challenge', type: 'textarea', placeholder: 'What the client is facing...' },
        { key: 'solution', label: 'Our Approach', type: 'textarea', placeholder: 'How SMIC360 will solve it...' },
      ]},
      { name: 'Expected Outcomes', fields: [
        { key: 'outcomes', label: 'Key Outcomes', type: 'textarea', placeholder: 'Expected results...' },
      ]},
      { name: 'Call to Action', fields: [
        { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'e.g. Start Your Transformation' },
        { key: 'ctaUrl', label: 'Button Link', type: 'text', placeholder: 'https://...' },
      ]},
    ],
    values: {
      clientName: 'Client Name',
      industry: 'Industry',
      heading: 'Your Brand <em>Transformation</em> Starts Here',
      challenge: 'In competitive markets like Ghana, brands that fail to differentiate get lost in the noise. Without a clear strategy, marketing spend becomes fragmented and results become inconsistent.',
      solution: 'SMIC360 takes a 360° approach: we begin with deep consultancy, move to concept and layout, package the right media mix, and deliver with measurable results. Our team of strategists, creatives, and media specialists work as one unit for your brand.',
      outcomes: 'Clear, differentiated brand positioning\nConsistent visual identity across all touchpoints\nMeasurable increase in brand awareness\nStrategic media plan with optimised ROI\nOngoing performance monitoring and refinement',
      cta: 'Start Your Transformation',
      ctaUrl: 'https://smic360.com/contact/',
    },
    html: '',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REAL ESTATE
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'phoenix-enclave',
    title: 'Phoenix Enclave Showcase',
    category: 'Real Estate',
    fieldGroups: [
      { name: 'Property', fields: [
        { key: 'propertyName', label: 'Property Name', type: 'text', placeholder: 'e.g. The Phoenix Enclave' },
        { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Spintex Road, Accra' },
        { key: 'phase', label: 'Phase', type: 'text', placeholder: 'e.g. Phase II — Now Open' },
      ]},
      { name: 'Details', fields: [
        { key: 'heroText', label: 'Hero Text', type: 'text', placeholder: 'e.g. Building Foundations for the Future' },
        { key: 'body', label: 'Description', type: 'textarea', placeholder: 'Property description...' },
        { key: 'price', label: 'Starting Price', type: 'text', placeholder: 'e.g. From GH₵ 850,000' },
      ]},
      { name: 'Features', fields: [
        { key: 'features', label: 'Key Features', type: 'textarea', placeholder: 'List features...' },
      ]},
      { name: 'Call to Action', fields: [
        { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'e.g. Reserve Your Unit' },
        { key: 'ctaUrl', label: 'Button Link', type: 'text', placeholder: 'https://...' },
      ]},
    ],
    values: {
      propertyName: 'The Phoenix Enclave',
      location: 'Spintex Road, Accra',
      phase: 'Phase II — Now Open',
      heroText: 'Building <em>Foundations</em> for the Future',
      body: 'Discover modern gated communities designed for the future of Ghana. The Phoenix Enclave is SMIC360\'s premier real estate offering — thoughtfully designed residential and commercial spaces built with modern architecture and premium finishes.',
      price: 'From GH₵ 850,000',
      features: 'Gated & Secured Community with 24/7 security\nModern Architecture with premium finishes\nStrategic location on Spintex Road, Accra\n24/7 Power & Water Supply\nLandscaped Gardens & Pool Access\nHigh ROI investment opportunity',
      cta: 'Reserve Your Unit',
      ctaUrl: 'https://smic360.com/the-phoenix-enclave/',
    },
    html: '',
  },

  {
    id: 'property-listing',
    title: 'Property Listing',
    category: 'Real Estate',
    fieldGroups: [
      { name: 'Listing Details', fields: [
        { key: 'propertyType', label: 'Property Type', type: 'text', placeholder: 'e.g. 3-Bedroom Luxury Villa' },
        { key: 'address', label: 'Location', type: 'text', placeholder: 'e.g. Cantonments, Accra' },
        { key: 'price', label: 'Price', type: 'text', placeholder: 'e.g. GH₵ 2,200,000' },
      ]},
      { name: 'Specifications', fields: [
        { key: 'bedrooms', label: 'Bedrooms', type: 'text', placeholder: 'e.g. 5' },
        { key: 'bathrooms', label: 'Bathrooms', type: 'text', placeholder: 'e.g. 4' },
        { key: 'area', label: 'Area', type: 'text', placeholder: 'e.g. 380 m²' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Property description...' },
      ]},
      { name: 'Call to Action', fields: [
        { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'e.g. Schedule a Viewing' },
        { key: 'ctaUrl', label: 'Button Link', type: 'text', placeholder: 'https://...' },
      ]},
    ],
    values: {
      propertyType: '3-Bedroom Luxury Villa',
      address: 'Cantonments, Accra',
      price: 'GH₵ 2,200,000',
      bedrooms: '5',
      bathrooms: '4',
      area: '380 m²',
      description: 'A stunning luxury villa in one of Accra\'s most prestigious neighbourhoods. Contemporary design meets premium finishes throughout, with spacious living areas flooded with natural light.',
      cta: 'Schedule a Viewing',
      ctaUrl: 'https://smic360.com/solutions/',
    },
    html: '',
  },

  {
    id: 'homestay-booking',
    title: 'Furnished Apartment Booking',
    category: 'Real Estate',
    fieldGroups: [
      { name: 'Booking', fields: [
        { key: 'propertyName', label: 'Property Name', type: 'text', placeholder: 'e.g. Christie\'s Homestay' },
        { key: 'guestName', label: 'Guest Name', type: 'text', placeholder: 'e.g. Mr. John Doe' },
        { key: 'checkIn', label: 'Check-in Date', type: 'text', placeholder: 'e.g. July 1, 2026' },
        { key: 'checkOut', label: 'Check-out Date', type: 'text', placeholder: 'e.g. July 7, 2026' },
      ]},
      { name: 'Details', fields: [
        { key: 'body', label: 'Welcome Message', type: 'textarea', placeholder: 'Welcome message for guest...' },
        { key: 'amenities', label: 'Amenities', type: 'textarea', placeholder: 'List amenities...' },
      ]},
      { name: 'Call to Action', fields: [
        { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'e.g. View Booking Details' },
        { key: 'ctaUrl', label: 'Button Link', type: 'text', placeholder: 'https://...' },
      ]},
    ],
    values: {
      propertyName: 'Christie\'s Homestay — Lashibi Community 20',
      guestName: 'Valued Guest',
      checkIn: 'July 1, 2026',
      checkOut: 'July 7, 2026',
      body: 'Thank you for choosing Christie\'s Homestay for your stay in Accra. Your furnished apartment is ready and we look forward to making your visit comfortable and memorable.',
      amenities: 'Fully furnished one-bedroom apartment\nAir conditioning & WiFi\nKitchen with modern appliances\n24/7 security & parking\nProximity to beaches and commercial centres',
      cta: 'View Booking Details',
      ctaUrl: '#',
    },
    html: '',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROCUREMENT & SUPPLY
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'purchase-order',
    title: 'Purchase Order',
    category: 'Procurement',
    fieldGroups: [
      { name: 'Order Details', fields: [
        { key: 'poNumber', label: 'PO Number', type: 'text', placeholder: 'e.g. PO-2026-0087' },
        { key: 'orderDate', label: 'Order Date', type: 'text', placeholder: 'e.g. June 20, 2026' },
        { key: 'vendor', label: 'Vendor / Supplier', type: 'text', placeholder: 'e.g. Ashfoam Ghana Ltd' },
      ]},
      { name: 'Items', fields: [
        { key: 'item1', label: 'Item 1', type: 'text', placeholder: 'e.g. Office Furniture — Executive Desks' },
        { key: 'item1Qty', label: 'Item 1 Quantity', type: 'text', placeholder: 'e.g. 12 units' },
        { key: 'item1Price', label: 'Item 1 Unit Price', type: 'text', placeholder: 'e.g. GH₵ 3,500.00' },
        { key: 'item2', label: 'Item 2', type: 'text', placeholder: 'e.g. IT Equipment — Laptops' },
        { key: 'item2Qty', label: 'Item 2 Quantity', type: 'text', placeholder: 'e.g. 25 units' },
        { key: 'item2Price', label: 'Item 2 Unit Price', type: 'text', placeholder: 'e.g. GH₵ 8,200.00' },
        { key: 'total', label: 'Total', type: 'text', placeholder: 'e.g. GH₵ 247,000.00' },
      ]},
      { name: 'Delivery', fields: [
        { key: 'deliveryDate', label: 'Required Delivery Date', type: 'text', placeholder: 'e.g. July 15, 2026' },
        { key: 'deliveryAddress', label: 'Delivery Address', type: 'textarea', placeholder: 'Full delivery address...' },
      ]},
    ],
    values: {
      poNumber: 'PO-2026-0087',
      orderDate: 'June 20, 2026',
      vendor: 'Vendor Name',
      item1: 'Office Furniture — Executive Desks',
      item1Qty: '12 units',
      item1Price: 'GH₵ 3,500.00',
      item2: 'IT Equipment — Laptops',
      item2Qty: '25 units',
      item2Price: 'GH₵ 8,200.00',
      total: 'GH₵ 247,000.00',
      deliveryDate: 'July 15, 2026',
      deliveryAddress: 'SMIC360 Limited\n1st Floor, Verostina House\nOpp. DSTV Office, Community 18\nOff Spintex Road, Accra, Ghana',
    },
    html: '',
  },

  {
    id: 'rfq',
    title: 'Request for Quotation',
    category: 'Procurement',
    fieldGroups: [
      { name: 'RFQ Info', fields: [
        { key: 'rfqNumber', label: 'RFQ Number', type: 'text', placeholder: 'e.g. RFQ-2026-0032' },
        { key: 'issueDate', label: 'Issue Date', type: 'text', placeholder: 'e.g. June 20, 2026' },
        { key: 'closingDate', label: 'Closing Date', type: 'text', placeholder: 'e.g. July 10, 2026' },
      ]},
      { name: 'Requirements', fields: [
        { key: 'subject', label: 'Subject', type: 'text', placeholder: 'e.g. MEP Equipment Supply & Installation' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe procurement needs...' },
        { key: 'quantity', label: 'Estimated Quantity', type: 'text', placeholder: 'e.g. As per schedule' },
        { key: 'deliveryLocation', label: 'Delivery Location', type: 'text', placeholder: 'e.g. Spintex Road, Accra' },
      ]},
      { name: 'Instructions', fields: [
        { key: 'instructions', label: 'Submission Instructions', type: 'textarea', placeholder: 'How to submit...' },
      ]},
    ],
    values: {
      rfqNumber: 'RFQ-2026-0032',
      issueDate: 'June 20, 2026',
      closingDate: 'July 10, 2026',
      subject: 'MEP Equipment Supply & Installation',
      description: 'SMIC360 Limited is seeking quotations for the supply and installation of Mechanical, Electrical & Plumbing (MEP) equipment for The Phoenix Enclave Phase II development project.',
      quantity: 'As per bill of quantities',
      deliveryLocation: 'The Phoenix Enclave, Spintex Road, Accra',
      instructions: 'Please submit your quotation via email to procurement@smic360.com with subject line "RFQ-2026-0032 Response". Quotations must include unit pricing, lead time, warranty terms, and relevant certifications. Closing date: July 10, 2026.',
    },
    html: '',
  },

  {
    id: 'procurement-confirmation',
    title: 'Procurement Confirmation',
    category: 'Procurement',
    fieldGroups: [
      { name: 'Order Info', fields: [
        { key: 'orderNumber', label: 'Order Number', type: 'text', placeholder: 'e.g. PO-2026-0087' },
        { key: 'clientName', label: 'Client / Department', type: 'text', placeholder: 'e.g. Phoenix Enclave Project Team' },
        { key: 'confirmDate', label: 'Confirmation Date', type: 'text', placeholder: 'e.g. June 22, 2026' },
      ]},
      { name: 'Details', fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'e.g. Order Confirmed' },
        { key: 'body', label: 'Message', type: 'textarea', placeholder: 'Confirmation message...' },
        { key: 'items', label: 'Items Confirmed', type: 'textarea', placeholder: 'List confirmed items...' },
      ]},
      { name: 'Timeline', fields: [
        { key: 'estimatedDelivery', label: 'Estimated Delivery', type: 'text', placeholder: 'e.g. July 15, 2026' },
        { key: 'notes', label: 'Additional Notes', type: 'textarea', placeholder: 'Any special instructions...' },
      ]},
    ],
    values: {
      orderNumber: 'PO-2026-0087',
      clientName: 'Project Team',
      confirmDate: 'June 22, 2026',
      heading: 'Order <em>Confirmed</em>',
      body: 'Your procurement order has been confirmed and is being processed by our supply chain team. We maintain rigorous quality assurance throughout sourcing, inspection, and delivery.',
      items: 'Item 1 — Confirmed\nItem 2 — Confirmed\nAll items subject to quality inspection upon delivery',
      estimatedDelivery: 'July 15, 2026',
      notes: 'Delivery will be coordinated with the site manager. Kindly ensure access is available on the scheduled date.',
    },
    html: '',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLIENT RELATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'consultation-booking',
    title: 'Consultation Booking',
    category: 'Client Relations',
    fieldGroups: [
      { name: 'Booking', fields: [
        { key: 'clientName', label: 'Client Name', type: 'text', placeholder: 'e.g. Mrs. Abena Osei' },
        { key: 'serviceType', label: 'Service Type', type: 'text', placeholder: 'e.g. Brand Strategy Consultation' },
        { key: 'date', label: 'Date & Time', type: 'text', placeholder: 'e.g. June 25, 2026 at 10:00 AM' },
      ]},
      { name: 'Message', fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'e.g. Your Consultation Is Confirmed' },
        { key: 'body', label: 'Message', type: 'textarea', placeholder: 'Details about the consultation...' },
      ]},
      { name: 'Location', fields: [
        { key: 'location', label: 'Location / Meeting Link', type: 'textarea', placeholder: 'Office address or virtual meeting link...' },
      ]},
    ],
    values: {
      clientName: 'Valued Client',
      serviceType: 'Free Advertising Consultation',
      date: 'Date & Time TBD',
      heading: 'Your Consultation Is <em>Confirmed</em>',
      body: 'Thank you for booking a consultation with SMIC360. Our team will assess your business needs and present recommendations with an implementation plan — at no obligation.',
      location: 'SMIC360 Limited\n1st Floor, Verostina House, Opp. DSTV Office\nCommunity 18, Off Spintex Road, Accra\n\nOr via Google Meet — link will be sent 24 hours before the session.',
    },
    html: '',
  },

  {
    id: 'project-update',
    title: 'Project Milestone Update',
    category: 'Client Relations',
    fieldGroups: [
      { name: 'Project', fields: [
        { key: 'projectName', label: 'Project Name', type: 'text', placeholder: 'e.g. Sigma Brand Launch' },
        { key: 'clientName', label: 'Client Name', type: 'text', placeholder: 'e.g. Platinum Impex' },
        { key: 'milestone', label: 'Milestone', type: 'text', placeholder: 'e.g. Phase 2 — Campaign Execution' },
      ]},
      { name: 'Update', fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'e.g. Your Project Update' },
        { key: 'body', label: 'Progress Update', type: 'textarea', placeholder: 'Describe current progress...' },
        { key: 'completedTasks', label: 'Completed Tasks', type: 'textarea', placeholder: 'List completed items...' },
        { key: 'nextSteps', label: 'Next Steps', type: 'textarea', placeholder: 'Upcoming tasks...' },
      ]},
      { name: 'Timeline', fields: [
        { key: 'nextMilestone', label: 'Next Milestone Date', type: 'text', placeholder: 'e.g. July 15, 2026' },
        { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'e.g. View Full Report' },
        { key: 'ctaUrl', label: 'Button Link', type: 'text', placeholder: 'https://...' },
      ]},
    ],
    values: {
      projectName: 'Project Name',
      clientName: 'Client Name',
      milestone: 'Current Milestone',
      heading: 'Your <em>Project Update</em>',
      body: 'We are pleased to share the latest progress on your project. Our team continues to execute with precision and keep all stakeholders informed at every stage.',
      completedTasks: 'Brand strategy document approved\nCreative concepts delivered\nMedia plan finalised',
      nextSteps: 'Campaign execution launch\nPerformance monitoring & weekly reports\nMonth-end review meeting',
      nextMilestone: 'July 15, 2026',
      cta: 'View Full Report',
      ctaUrl: '#',
    },
    html: '',
  },

  {
    id: 'testimonial-request',
    title: 'Testimonial Request',
    category: 'Client Relations',
    fieldGroups: [
      { name: 'Client', fields: [
        { key: 'clientName', label: 'Client Name', type: 'text', placeholder: 'e.g. Mr. Suleiman Habuba' },
        { key: 'projectName', label: 'Completed Project', type: 'text', placeholder: 'e.g. Fox Cooling MEP Rebrand' },
      ]},
      { name: 'Message', fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'e.g. Share Your Experience' },
        { key: 'body', label: 'Message', type: 'textarea', placeholder: 'Request message...' },
      ]},
      { name: 'Call to Action', fields: [
        { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'e.g. Leave a Google Review' },
        { key: 'ctaUrl', label: 'Button Link', type: 'text', placeholder: 'https://...' },
      ]},
    ],
    values: {
      clientName: 'Valued Client',
      projectName: 'Your Recent Project',
      heading: 'Your Opinion <em>Matters</em>',
      body: 'We hope you are delighted with the results of your recent project with SMIC360. Your feedback helps us continue delivering excellence and helps other businesses discover the SMIC360 difference.',
      cta: 'Leave a Google Review',
      ctaUrl: 'https://www.google.com/search?q=SMIC360+LIMITED',
    },
    html: '',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INTERNAL & EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'event-invitation',
    title: 'Event Invitation',
    category: 'Events',
    fieldGroups: [
      { name: 'Event', fields: [
        { key: 'eventName', label: 'Event Name', type: 'text', placeholder: 'e.g. Phoenix Enclave Phase II Launch' },
        { key: 'date', label: 'Date & Time', type: 'text', placeholder: 'e.g. July 12, 2026 at 6:00 PM' },
        { key: 'venue', label: 'Venue', type: 'text', placeholder: 'e.g. The Phoenix Enclave, Spintex Road' },
      ]},
      { name: 'Message', fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'e.g. You Are Invited' },
        { key: 'body', label: 'Invitation Text', type: 'textarea', placeholder: 'Describe the event...' },
      ]},
      { name: 'RSVP', fields: [
        { key: 'cta', label: 'RSVP Button', type: 'text', placeholder: 'e.g. Confirm Attendance' },
        { key: 'ctaUrl', label: 'RSVP Link', type: 'text', placeholder: 'https://...' },
        { key: 'rsvpDeadline', label: 'RSVP Deadline', type: 'text', placeholder: 'e.g. July 8, 2026' },
      ]},
    ],
    values: {
      eventName: 'Phoenix Enclave Phase II Launch',
      date: 'July 12, 2026 at 6:00 PM',
      venue: 'The Phoenix Enclave, Spintex Road, Accra',
      heading: 'You Are <em>Invited</em>',
      body: 'Join us for the exclusive launch of Phase II of The Phoenix Enclave — SMIC360\'s flagship gated community development. Experience modern living redefined with premium architecture and strategic location.',
      cta: 'Confirm Attendance',
      ctaUrl: '#',
      rsvpDeadline: 'July 8, 2026',
    },
    html: '',
  },

  {
    id: 'system-alert',
    title: 'System / Service Alert',
    category: 'Internal',
    fieldGroups: [
      { name: 'Alert', fields: [
        { key: 'severity', label: 'Severity Level', type: 'text', placeholder: 'e.g. Info / Warning / Critical' },
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'e.g. Scheduled Maintenance Notice' },
        { key: 'body', label: 'Description', type: 'textarea', placeholder: 'Describe the alert...' },
      ]},
      { name: 'Timing', fields: [
        { key: 'startTime', label: 'Start Time', type: 'text', placeholder: 'e.g. June 25, 2026 — 02:00 UTC' },
        { key: 'endTime', label: 'End Time', type: 'text', placeholder: 'e.g. June 25, 2026 — 06:00 UTC' },
        { key: 'impact', label: 'Impact', type: 'textarea', placeholder: 'What will be affected...' },
      ]},
    ],
    values: {
      severity: 'Info',
      heading: 'Scheduled <em>Maintenance</em> Notice',
      body: 'SMIC360 will undergo scheduled maintenance to upgrade our core infrastructure and improve service reliability. During this window, some services may be temporarily unavailable.',
      startTime: 'June 25, 2026 — 02:00 UTC',
      endTime: 'June 25, 2026 — 06:00 UTC',
      impact: 'Website, email services, and client portal may experience brief interruptions during the maintenance window.',
    },
    html: '',
  },

  {
    id: 'password-reset',
    title: 'Password Reset',
    category: 'Internal',
    fieldGroups: [
      { name: 'Security', fields: [
        { key: 'heading', label: 'Heading', type: 'text', placeholder: 'e.g. Security Verification' },
        { key: 'body', label: 'Message', type: 'textarea', placeholder: 'Security message...' },
        { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'e.g. Reset Password' },
        { key: 'ctaUrl', label: 'Button Link', type: 'text', placeholder: 'https://...' },
      ]},
      { name: 'Note', fields: [
        { key: 'note', label: 'Security Note', type: 'textarea', placeholder: 'If you did not request this...' },
      ]},
    ],
    values: {
      heading: 'Security <em>Verification</em>',
      body: 'A request has been made to reset your SMIC360 account password. If this was you, please click the button below to proceed.',
      cta: 'Reset Password',
      ctaUrl: '#',
      note: 'If you did not request a password reset, please ignore this email or contact our support team immediately at christie@smic360.com',
    },
    html: '',
  },

  {
    id: 'company-profile-full',
    title: 'Company Profile — Premium',
    category: 'General',
    fieldGroups: [
      { name: 'Headline', fields: [
        { key: 'headline', label: 'Gold Band Headline', type: 'text', placeholder: 'e.g. Ghana\'s Most Trusted 360° Brand Agency' },
      ]},
      { name: 'Who We Are', fields: [
        { key: 'whoHeading', label: 'Section Heading', type: 'text', placeholder: 'e.g. Your Brand\'s Growth Partner' },
        { key: 'whoBody1', label: 'History Paragraph', type: 'textarea', placeholder: 'Company history...' },
        { key: 'whoBody2', label: 'Values Paragraph', type: 'textarea', placeholder: 'Company values...' },
      ]},
      { name: 'Vision & Mission', fields: [
        { key: 'vision', label: 'Vision', type: 'textarea', placeholder: 'Company vision...' },
        { key: 'mission', label: 'Mission', type: 'textarea', placeholder: 'Company mission...' },
      ]},
      { name: 'Call to Action', fields: [
        { key: 'ctaHeading', label: 'CTA Heading', type: 'text', placeholder: 'e.g. Ready to Elevate Your Brand?' },
        { key: 'ctaSubtext', label: 'CTA Subtext', type: 'text', placeholder: 'e.g. Let\'s create something unforgettable.' },
      ]},
    ],
    values: {
      headline: "Ghana\u2019s Most Trusted 360\u00b0 Brand Agency \u2014 Delivering Real Results Since 2006",
      whoHeading: "Your Brand\u2019s Growth Partner",
      whoBody1: "Formerly Meshan-Ad Consult, SMIC360 was registered in 2006 and began formal operations in April 2009 \u2014 growing from a sole proprietorship into a fully incorporated Limited Liability Company in 2011.",
      whoBody2: "We are built on the passion to offer efficient, sustainable solutions \u2014 treating every client, staff member and supplier like family.",
      vision: "To become the Preferred Advertising Agency in Ghana and Beyond.",
      mission: "To provide quality, effective Advertising, Media and PR while investing in our people and using up-to-date technology.",
      ctaHeading: "Ready to Elevate Your Brand?",
      ctaSubtext: "Let\u2019s create something your audience will never forget.",
    },
    html: '',
  },
];

// ─── IMAGE URLs ──────────────────────────────────────────────────────────────

const LOGO_CLOUD = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg";
const HERO_IMG = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865846/WhatsApp_Image_2026-05-03_at_7.41.12_PM_3_udwvxo.jpg";
const TEAM_IMG = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1778495883/sa_xpfeca.jpg";
const RE_IMG = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg";
const PROC_IMG = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777872031/PROCURE_cmjr84.jpg";
const BRANDS_IMG = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1778496968/xcz_o35zcw.jpg";
const CTA_BG = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1778495883/sd_akkqko.jpg";

// ─── GENERATE HTML ───────────────────────────────────────────────────────────

DEFAULT_TEMPLATES.forEach(t => {
  t.html = generateHtml(t);
});

export function generateHtml(template: EmailTemplate): string {
  const v = template.values;
  let raw: string;
  switch (template.id) {
    case 'welcome': raw = rWelcome(v); break;
    case 'invoice': raw = rInvoice(v); break;
    case 'company-profile': raw = rCompanyProfile(v); break;
    case 'company-profile-full': raw = rCompanyProfileFull(v); break;
    case 'campaign-proposal': raw = rCampaignProposal(v); break;
    case 'newsletter': raw = rNewsletter(v); break;
    case 'brand-strategy-pitch': raw = rBrandPitch(v); break;
    case 'phoenix-enclave': raw = rPhoenixEnclave(v); break;
    case 'property-listing': raw = rPropertyListing(v); break;
    case 'homestay-booking': raw = rHomestayBooking(v); break;
    case 'purchase-order': raw = rPurchaseOrder(v); break;
    case 'rfq': raw = rRfq(v); break;
    case 'procurement-confirmation': raw = rProcurementConfirm(v); break;
    case 'consultation-booking': raw = rConsultationBooking(v); break;
    case 'project-update': raw = rProjectUpdate(v); break;
    case 'testimonial-request': raw = rTestimonialRequest(v); break;
    case 'event-invitation': raw = rEventInvitation(v); break;
    case 'system-alert': raw = rSystemAlert(v); break;
    case 'password-reset': raw = rPasswordReset(v); break;
    default: raw = rGeneric(v);
  }
  return injectSeal(raw);
}

// ─── RENDERERS ───────────────────────────────────────────────────────────────

function rGeneric(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.header{padding:40px;text-align:center;border-bottom:1px solid ${SMIC.borderLight}}.content{padding:40px;text-align:center;color:${SMIC.text}}.h1{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:300;margin:0 0 20px;line-height:1.1}.h1 em,.h2 em{font-style:italic;color:${SMIC.gold}}.body{font-size:15px;line-height:1.8;color:${SMIC.muted};margin-bottom:30px}.btn{${GOLD_BTN}}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="header">${logoBlock()}</div><div class="content"><h1 class="h1">${v.heading || v.headline || ''}</h1><p class="body">${v.body || ''}</p>${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rWelcome(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.header{padding:40px;text-align:center;border-bottom:1px solid ${SMIC.borderLight}}.content{padding:40px;text-align:center;color:${SMIC.text}}.h1{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:300;margin:0 0 12px;line-height:1.1}.h1 em{font-style:italic;color:${SMIC.gold}}.tag{display:inline-block;font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;border:1px solid ${SMIC.border};padding:6px 16px;margin-bottom:20px}.body{font-size:15px;line-height:1.8;color:${SMIC.muted};margin-bottom:30px}.btn{${GOLD_BTN}}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="header">${logoBlock()}</div><div class="content"><div class="tag">${v.projectType || ''}</div><h1 class="h1">${v.heading || ''}</h1><p class="body">${v.body || ''}</p>${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rInvoice(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{padding:40px 20px}.inv{max-width:700px;margin:0 auto;background:${SMIC.card};border:1px solid ${SMIC.border};padding:50px}.hdr{border-bottom:1px solid ${SMIC.borderLight};padding-bottom:30px;margin-bottom:40px}.logo{width:50px;height:50px;border-radius:6%;float:left;border:1px solid ${SMIC.border}}.brand{float:left;margin-left:15px;font-family:'Cormorant Garamond',serif;font-size:24px;color:${SMIC.gold};padding-top:10px}.inv-id{float:right;text-align:right;font-size:11px;letter-spacing:0.1em;padding-top:15px;color:${SMIC.dim}}.cl{clear:both}.client{margin-bottom:30px;font-size:13px;color:${SMIC.muted}}.client strong{color:${SMIC.text};display:block;margin-bottom:4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase}table{width:100%;border-collapse:collapse;margin-top:20px}th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:${SMIC.dim};padding-bottom:15px;border-bottom:1px solid #1a1a1a}td{padding:16px 0;border-bottom:1px solid #111;color:${SMIC.muted};font-size:13px}.total td{border:none;color:${SMIC.text};font-size:18px;font-family:'Cormorant Garamond',serif;padding-top:30px}.total .lbl{color:${SMIC.dim};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;font-family:'DM Sans',sans-serif}.total .amt{color:${SMIC.gold}}.bank{margin-top:30px;padding:20px;border:1px solid ${SMIC.borderLight};font-size:11px;color:${SMIC.muted};line-height:1.8;white-space:pre-line}</style></head><body><div class="outer"><div class="inv">${goldBar('INVOICE')}<div style="margin-top:40px"><div class="hdr"><img src="${LOGO_URL}" class="logo"><div class="brand">SMIC360 Ltd</div><div class="inv-id">${v.invoiceNumber || ''}<br>${v.invoiceDate || ''}</div><div class="cl"></div></div><div class="client"><strong>Billed To</strong>${v.clientName || ''}</div><table><thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead><tbody><tr><td>${v.item1 || ''}</td><td style="text-align:right">${v.item1Amount || ''}</td></tr><tr><td>${v.item2 || ''}</td><td style="text-align:right">${v.item2Amount || ''}</td></tr>${v.item3 ? `<tr><td>${v.item3}</td><td style="text-align:right">${v.item3Amount || ''}</td></tr>` : ''}<tr class="total"><td class="lbl">Total Due</td><td style="text-align:right" class="amt">${v.total || ''}</td></tr></tbody></table>${v.dueDate ? `<div style="margin-top:20px;font-size:12px;color:${SMIC.muted}">Payment due: <strong style="color:${SMIC.text}">${v.dueDate}</strong></div>` : ''}${v.bankDetails ? `<div class="bank"><strong style="color:${SMIC.gold};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;display:block;margin-bottom:8px">Bank Details</strong>${v.bankDetails}</div>` : ''}</div></div></div></body></html>`;
}

function rCompanyProfile(v: Record<string, string>): string {
  return rCompanyProfileFull(v);
}

function rCampaignProposal(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.hdr{padding:40px;text-align:center;border-bottom:1px solid ${SMIC.borderLight}}.content{padding:40px;color:${SMIC.text}}.label{font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;margin-bottom:10px;display:block;text-align:center}.h1{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;margin:0 0 8px;line-height:1.1;text-align:center}.h1 em{font-style:italic;color:${SMIC.gold}}.client{font-size:12px;color:${SMIC.dim};text-align:center;margin-bottom:24px}.body{font-size:14px;line-height:1.8;color:${SMIC.muted};margin-bottom:28px}.dlv{border-top:1px solid ${SMIC.borderLight};padding-top:24px}.dlv-title{font-size:10px;color:${SMIC.gold};letter-spacing:0.25em;text-transform:uppercase;margin-bottom:14px}.dlv-item{font-size:13px;color:${SMIC.muted};padding:10px 0;border-bottom:1px solid #111;line-height:1.6}.btn{${GOLD_BTN};text-align:center;display:block;margin-top:30px}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="hdr">${logoBlock(60, 16)}<div class="label">Campaign Proposal</div><div class="client">${v.clientName || ''} — ${v.projectName || ''}</div></div><div class="content"><h1 class="h1">${v.heading || ''}</h1><p class="body">${v.body || ''}</p>${v.deliverables ? `<div class="dlv"><div class="dlv-title">Key Deliverables</div>${v.deliverables.split('\n').map((l: string) => `<div class="dlv-item">${l}</div>`).join('')}</div>` : ''}${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rNewsletter(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.hdr{padding:50px 40px;text-align:center;background:#080808;border-bottom:1px solid ${SMIC.borderLight}}.brand-name{font-family:'Cormorant Garamond',serif;font-size:36px;color:${SMIC.text};letter-spacing:0.1em;margin-bottom:5px}.brand-name em{font-style:italic;color:${SMIC.gold}}.issue{font-size:9px;color:${SMIC.gold};letter-spacing:0.4em;text-transform:uppercase;margin-top:8px}.intro{padding:30px 40px;font-size:14px;color:${SMIC.muted};line-height:1.8;border-bottom:1px solid #111}.article{padding:36px 40px;border-bottom:1px solid #111}.cat{font-size:9px;color:${SMIC.dim};letter-spacing:0.2em;text-transform:uppercase;margin-bottom:10px;display:block}.title{font-family:'Cormorant Garamond',serif;font-size:26px;color:${SMIC.text};line-height:1.3;margin-bottom:12px;font-weight:300}.title em{font-style:italic;color:${SMIC.gold}}.excerpt{font-size:14px;color:${SMIC.muted};line-height:1.7;margin-bottom:16px}.link{color:${SMIC.gold};text-decoration:none;font-size:11px;font-weight:600;letter-spacing:0.1em}.highlight{margin:24px 40px;padding:24px;background:#080808;border:1px solid ${SMIC.borderLight};font-size:13px;color:${SMIC.muted};line-height:1.7}.highlight strong{color:${SMIC.gold};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;display:block;margin-bottom:8px}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="hdr">${logoBlock(50, 12)}<div class="brand-name">SMIC360 <em>Insights</em></div><div class="issue">${v.issue || ''}</div></div>${v.intro ? `<div class="intro">${v.intro}</div>` : ''}<div class="article"><span class="cat">${v.a1Tag || ''}</span><h3 class="title">${v.a1Title || ''}</h3><p class="excerpt">${v.a1Excerpt || ''}</p><a href="#" class="link">Read Article →</a></div><div class="article"><span class="cat">${v.a2Tag || ''}</span><h3 class="title">${v.a2Title || ''}</h3><p class="excerpt">${v.a2Excerpt || ''}</p><a href="#" class="link">Read Article →</a></div>${v.highlight ? `<div class="highlight"><strong>Featured</strong>${v.highlight}</div>` : ''}</div></div></body></html>`;
}

function rBrandPitch(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.hdr{padding:40px;text-align:center;border-bottom:1px solid ${SMIC.borderLight}}.content{padding:40px;color:${SMIC.text}}.label{font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;display:block;text-align:center;margin-bottom:10px}.h1{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;margin:0 0 24px;line-height:1.1;text-align:center}.h1 em{font-style:italic;color:${SMIC.gold}}.section{margin-bottom:28px}.section-title{font-size:10px;color:${SMIC.gold};letter-spacing:0.25em;text-transform:uppercase;margin-bottom:10px}.body{font-size:14px;line-height:1.8;color:${SMIC.muted}}.outcomes{border-top:1px solid ${SMIC.borderLight};padding-top:24px;margin-top:10px}.outcome{font-size:13px;color:${SMIC.muted};padding:10px 0;border-bottom:1px solid #111}.btn{${GOLD_BTN};text-align:center;display:block;margin-top:30px}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="hdr">${logoBlock(60, 14)}<div class="label">${v.clientName || ''} • ${v.industry || ''}</div></div><div class="content"><h1 class="h1">${v.heading || ''}</h1><div class="section"><div class="section-title">The Challenge</div><p class="body">${v.challenge || ''}</p></div><div class="section"><div class="section-title">Our Approach</div><p class="body">${v.solution || ''}</p></div>${v.outcomes ? `<div class="outcomes"><div class="section-title">Expected Outcomes</div>${v.outcomes.split('\n').map((l: string) => `<div class="outcome">${l}</div>`).join('')}</div>` : ''}${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rPhoenixEnclave(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.ticker{background:linear-gradient(90deg,${SMIC.gold},${SMIC.goldLight},${SMIC.gold});padding:9px;text-align:center;font-size:10px;font-weight:600;letter-spacing:0.32em;color:#080808;text-transform:uppercase}.content{padding:40px;text-align:center;color:${SMIC.text}}.label{color:${SMIC.gold};font-size:9px;letter-spacing:0.35em;text-transform:uppercase;margin-bottom:6px;display:block}.loc{font-size:11px;color:${SMIC.dim};margin-bottom:4px}.phase{font-size:10px;color:${SMIC.gold};letter-spacing:0.2em;margin-bottom:20px;display:block}.h1{font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:300;margin:0 0 8px;line-height:1.1}.h1 em{font-style:italic;color:${SMIC.gold}}.price{font-family:'Cormorant Garamond',serif;font-size:26px;color:${SMIC.gold};margin:16px 0 24px}.body{font-size:14px;line-height:1.8;color:${SMIC.muted};margin-bottom:28px}.features{text-align:left;border-top:1px solid ${SMIC.borderLight};padding-top:24px;margin-bottom:28px}.feat{font-size:13px;color:${SMIC.muted};padding:9px 0;border-bottom:1px solid #111;line-height:1.5}.btn{${GOLD_BTN}}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="ticker">${v.location || ''} • ${v.propertyName || ''}</div><div class="content"><span class="label">${v.propertyName || ''}</span><div class="loc">${v.location || ''}</div><span class="phase">${v.phase || ''}</span><h1 class="h1">${v.heroText || ''}</h1><div class="price">${v.price || ''}</div><p class="body">${v.body || ''}</p>${v.features ? `<div class="features">${v.features.split('\n').map((l: string) => `<div class="feat">${l}</div>`).join('')}</div>` : ''}${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rPropertyListing(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.top{background:linear-gradient(135deg,${SMIC.gold},${SMIC.goldLight});padding:10px;text-align:center;font-size:10px;font-weight:700;letter-spacing:0.3em;color:#080808;text-transform:uppercase}.content{padding:40px;color:${SMIC.text}}.type{font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;margin-bottom:8px;display:block}.h1{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:300;margin:0 0 6px}.address{color:${SMIC.muted};font-size:13px;margin-bottom:20px}.price{font-family:'Cormorant Garamond',serif;font-size:28px;color:${SMIC.gold};margin-bottom:20px}.specs{display:flex;gap:24px;border-top:1px solid ${SMIC.borderLight};padding-top:18px;margin-bottom:20px}.spec{text-align:center;flex:1}.spec-num{font-size:20px;font-weight:600;color:${SMIC.text}}.spec-label{font-size:9px;color:${SMIC.dim};letter-spacing:0.2em;text-transform:uppercase}.body{font-size:14px;color:${SMIC.muted};line-height:1.8;margin-bottom:28px}.btn{${GOLD_BTN}}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="top">${v.propertyType || 'Property Listing'}</div><div class="content"><span class="type">${v.propertyType || ''}</span><h1 class="h1">${v.address || ''}</h1><div class="price">${v.price || ''}</div><div class="specs"><div class="spec"><div class="spec-num">${v.bedrooms || '—'}</div><div class="spec-label">Beds</div></div><div class="spec"><div class="spec-num">${v.bathrooms || '—'}</div><div class="spec-label">Baths</div></div><div class="spec"><div class="spec-num">${v.area || '—'}</div><div class="spec-label">Area</div></div></div><p class="body">${v.description || ''}</p>${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rHomestayBooking(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.hdr{padding:40px;text-align:center;border-bottom:1px solid ${SMIC.borderLight}}.content{padding:40px;color:${SMIC.text}}.label{font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;display:block;text-align:center;margin-bottom:10px}.h1{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;margin:0 0 20px;line-height:1.1;text-align:center}.h1 em{font-style:italic;color:${SMIC.gold}}.dates{display:flex;gap:20px;margin-bottom:24px;border-top:1px solid ${SMIC.borderLight};padding-top:20px}.date-box{flex:1;text-align:center;padding:16px;background:#080808;border:1px solid ${SMIC.borderLight}}.date-label{font-size:9px;color:${SMIC.dim};letter-spacing:0.2em;text-transform:uppercase;margin-bottom:6px}.date-val{font-size:15px;color:${SMIC.text};font-weight:600}.body{font-size:14px;line-height:1.8;color:${SMIC.muted};margin-bottom:24px}.amenities{border-top:1px solid ${SMIC.borderLight};padding-top:20px;margin-bottom:24px}.amen-title{font-size:10px;color:${SMIC.gold};letter-spacing:0.25em;text-transform:uppercase;margin-bottom:12px}.amen{font-size:13px;color:${SMIC.muted};padding:8px 0;border-bottom:1px solid #111}.btn{${GOLD_BTN}}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="hdr">${logoBlock(60, 14)}<div class="label">${v.propertyName || ''}</div></div><div class="content"><h1 class="h1">Booking <em>Confirmed</em></h1><div class="dates"><div class="date-box"><div class="date-label">Check-in</div><div class="date-val">${v.checkIn || ''}</div></div><div class="date-box"><div class="date-label">Check-out</div><div class="date-val">${v.checkOut || ''}</div></div></div><p class="body">${v.body || ''}</p>${v.amenities ? `<div class="amenities"><div class="amen-title">Amenities</div>${v.amenities.split('\n').map((l: string) => `<div class="amen">${l}</div>`).join('')}</div>` : ''}${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rPurchaseOrder(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{padding:40px 20px}.po{max-width:700px;margin:0 auto;background:${SMIC.card};border:1px solid ${SMIC.border};padding:50px}.hdr{border-bottom:1px solid ${SMIC.borderLight};padding-bottom:30px;margin-bottom:30px}.logo{width:50px;height:50px;border-radius:6%;float:left;border:1px solid ${SMIC.border}}.brand{float:left;margin-left:15px;font-family:'Cormorant Garamond',serif;font-size:22px;color:${SMIC.gold};padding-top:10px}.po-id{float:right;text-align:right;font-size:11px;letter-spacing:0.1em;padding-top:10px;color:${SMIC.dim}}.cl{clear:both}.meta{margin-bottom:30px;font-size:13px;color:${SMIC.muted}}.meta strong{color:${SMIC.text}}table{width:100%;border-collapse:collapse;margin:20px 0}th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:${SMIC.dim};padding-bottom:15px;border-bottom:1px solid #1a1a1a}td{padding:14px 0;border-bottom:1px solid #111;color:${SMIC.muted};font-size:13px}.total td{border:none;color:${SMIC.text};font-size:16px;font-family:'Cormorant Garamond',serif;padding-top:25px}.total .amt{color:${SMIC.gold}}.delivery{margin-top:30px;padding:20px;border:1px solid ${SMIC.borderLight};font-size:12px;color:${SMIC.muted};white-space:pre-line}.delivery strong{color:${SMIC.gold};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;display:block;margin-bottom:8px}</style></head><body><div class="outer"><div class="po">${goldBar('PURCHASE ORDER')}<div style="margin-top:40px"><div class="hdr"><img src="${LOGO_URL}" class="logo"><div class="brand">SMIC360 Ltd</div><div class="po-id">${v.poNumber || ''}<br>${v.orderDate || ''}</div><div class="cl"></div></div><div class="meta"><strong>Vendor:</strong> ${v.vendor || ''}</div><table><thead><tr><th>Item</th><th>Qty</th><th style="text-align:right">Unit Price</th></tr></thead><tbody><tr><td>${v.item1 || ''}</td><td>${v.item1Qty || ''}</td><td style="text-align:right">${v.item1Price || ''}</td></tr><tr><td>${v.item2 || ''}</td><td>${v.item2Qty || ''}</td><td style="text-align:right">${v.item2Price || ''}</td></tr><tr class="total"><td colspan="2" style="color:${SMIC.dim};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;font-family:'DM Sans',sans-serif">Total</td><td style="text-align:right" class="amt">${v.total || ''}</td></tr></tbody></table>${v.deliveryDate || v.deliveryAddress ? `<div class="delivery"><strong>Delivery</strong>${v.deliveryDate ? `Required by: ${v.deliveryDate}` : ''}${v.deliveryAddress ? `\n\n${v.deliveryAddress}` : ''}</div>` : ''}</div></div></div></body></html>`;
}

function rRfq(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.content{padding:40px;color:${SMIC.text}}.label{color:${SMIC.gold};font-size:9px;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:8px;display:block;text-align:center}.h1{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;margin:0 0 20px;text-align:center;line-height:1.1}.h1 em{font-style:italic;color:${SMIC.gold}}.meta{font-size:12px;color:${SMIC.muted};margin-bottom:20px;line-height:1.8;text-align:center}.meta strong{color:${SMIC.text}}.body{font-size:14px;color:${SMIC.muted};line-height:1.8;margin-bottom:20px}.specs{margin:20px 0;padding:20px;border:1px solid ${SMIC.borderLight}}.specs dt{font-size:9px;color:${SMIC.gold};letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px}.specs dd{font-size:13px;color:${SMIC.muted};margin:0 0 14px;padding:0}.instructions{margin-top:24px;padding:20px;background:#080808;border:1px solid ${SMIC.borderLight};font-size:12px;color:${SMIC.muted};line-height:1.7}.instructions strong{color:${SMIC.gold};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;display:block;margin-bottom:8px}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card">${goldBar('REQUEST FOR QUOTATION')}<div class="content"><span class="label">${v.rfqNumber || ''}</span><h1 class="h1">${v.subject || ''}</h1><div class="meta"><strong>Issue Date:</strong> ${v.issueDate || ''}<br><strong>Closing Date:</strong> ${v.closingDate || ''}</div><p class="body">${v.description || ''}</p><dl class="specs"><dt>Estimated Quantity</dt><dd>${v.quantity || ''}</dd><dt>Delivery Location</dt><dd>${v.deliveryLocation || ''}</dd></dl>${v.instructions ? `<div class="instructions"><strong>Submission Instructions</strong>${v.instructions}</div>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rProcurementConfirm(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.hdr{padding:40px;text-align:center;border-bottom:1px solid ${SMIC.borderLight}}.content{padding:40px;color:${SMIC.text}}.label{font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;display:block;text-align:center;margin-bottom:10px}.h1{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;margin:0 0 20px;line-height:1.1;text-align:center}.h1 em{font-style:italic;color:${SMIC.gold}}.meta{font-size:12px;color:${SMIC.muted};margin-bottom:20px;text-align:center}.meta strong{color:${SMIC.text}}.body{font-size:14px;line-height:1.8;color:${SMIC.muted};margin-bottom:24px}.items{border-top:1px solid ${SMIC.borderLight};padding-top:20px;margin-bottom:24px}.item{font-size:13px;color:${SMIC.muted};padding:10px 0;border-bottom:1px solid #111}.timeline{padding:20px;background:#080808;border:1px solid ${SMIC.borderLight};font-size:12px;color:${SMIC.muted};line-height:1.7}.timeline strong{color:${SMIC.gold};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;display:block;margin-bottom:8px}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="hdr">${logoBlock(60, 14)}<div class="label">${v.orderNumber || ''}</div></div><div class="content"><h1 class="h1">${v.heading || ''}</h1><div class="meta"><strong>Client:</strong> ${v.clientName || ''}<br><strong>Confirmed:</strong> ${v.confirmDate || ''}</div><p class="body">${v.body || ''}</p>${v.items ? `<div class="items">${v.items.split('\n').map((l: string) => `<div class="item">${l}</div>`).join('')}</div>` : ''}${v.estimatedDelivery ? `<div class="timeline"><strong>Timeline</strong>Estimated Delivery: ${v.estimatedDelivery}${v.notes ? `<br><br>${v.notes}` : ''}</div>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rConsultationBooking(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.hdr{padding:40px;text-align:center;border-bottom:1px solid ${SMIC.borderLight}}.content{padding:40px;color:${SMIC.text}}.label{font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;display:block;text-align:center;margin-bottom:10px}.h1{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;margin:0 0 20px;line-height:1.1;text-align:center}.h1 em{font-style:italic;color:${SMIC.gold}}.body{font-size:14px;line-height:1.8;color:${SMIC.muted};margin-bottom:24px}.details{border-top:1px solid ${SMIC.borderLight};padding-top:20px;margin-bottom:24px}.detail{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #111;font-size:13px;color:${SMIC.muted}}.detail strong{color:${SMIC.gold};font-size:10px;letter-spacing:0.15em;text-transform:uppercase;min-width:120px;display:inline-block}.location{padding:20px;background:#080808;border:1px solid ${SMIC.borderLight};font-size:12px;color:${SMIC.muted};line-height:1.8;white-space:pre-line}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="hdr">${logoBlock(60, 14)}<div class="label">${v.serviceType || ''}</div></div><div class="content"><h1 class="h1">${v.heading || ''}</h1><p class="body">${v.body || ''}</p><div class="details"><div class="detail"><strong>Client</strong>${v.clientName || ''}</div><div class="detail"><strong>Date & Time</strong>${v.date || ''}</div><div class="detail"><strong>Service</strong>${v.serviceType || ''}</div></div>${v.location ? `<div class="location">${v.location}</div>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rProjectUpdate(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.hdr{padding:40px;text-align:center;border-bottom:1px solid ${SMIC.borderLight}}.content{padding:40px;color:${SMIC.text}}.label{font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;display:block;text-align:center;margin-bottom:10px}.h1{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;margin:0 0 8px;line-height:1.1;text-align:center}.h1 em{font-style:italic;color:${SMIC.gold}}.client{font-size:12px;color:${SMIC.dim};text-align:center;margin-bottom:24px}.body{font-size:14px;line-height:1.8;color:${SMIC.muted};margin-bottom:28px}.section{border-top:1px solid ${SMIC.borderLight};padding-top:20px;margin-bottom:24px}.section-title{font-size:10px;color:${SMIC.gold};letter-spacing:0.25em;text-transform:uppercase;margin-bottom:10px}.task{font-size:13px;color:${SMIC.muted};padding:8px 0;border-bottom:1px solid #111}.next{padding:16px 20px;background:#080808;border:1px solid ${SMIC.borderLight};font-size:12px;color:${SMIC.muted}}.next strong{color:${SMIC.gold};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;display:block;margin-bottom:6px}.btn{${GOLD_BTN};text-align:center;display:block;margin-top:24px}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="hdr">${logoBlock(60, 14)}<div class="label">${v.projectName || ''} — ${v.milestone || ''}</div><div class="client">${v.clientName || ''}</div></div><div class="content"><h1 class="h1">${v.heading || ''}</h1><p class="body">${v.body || ''}</p>${v.completedTasks ? `<div class="section"><div class="section-title">Completed</div>${v.completedTasks.split('\n').map((l: string) => `<div class="task">${l}</div>`).join('')}</div>` : ''}${v.nextSteps ? `<div class="section"><div class="section-title">Next Steps</div>${v.nextSteps.split('\n').map((l: string) => `<div class="task">${l}</div>`).join('')}</div>` : ''}${v.nextMilestone ? `<div class="next"><strong>Next Milestone</strong>${v.nextMilestone}</div>` : ''}${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rTestimonialRequest(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.hdr{padding:40px;text-align:center;border-bottom:1px solid ${SMIC.borderLight}}.content{padding:40px;text-align:center;color:${SMIC.text}}.label{font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;display:block;margin-bottom:10px}.h1{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:300;margin:0 0 20px;line-height:1.1}.h1 em{font-style:italic;color:${SMIC.gold}}.body{font-size:15px;line-height:1.8;color:${SMIC.muted};margin-bottom:30px}.stars{font-size:28px;color:${SMIC.gold};letter-spacing:4px;margin-bottom:24px}.btn{${GOLD_BTN}}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="hdr">${logoBlock()}</div><div class="content"><div class="label">${v.projectName || ''}</div><h1 class="h1">${v.heading || ''}</h1><div class="stars">★★★★★</div><p class="body">${v.body || ''}</p>${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rEventInvitation(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.content{padding:40px;text-align:center;color:${SMIC.text}}.label{font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;display:block;margin-bottom:10px}.h1{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:300;margin:0 0 20px;line-height:1.1}.h1 em{font-style:italic;color:${SMIC.gold}}.body{font-size:15px;line-height:1.8;color:${SMIC.muted};margin-bottom:28px}.event-details{border-top:1px solid ${SMIC.borderLight};padding-top:24px;margin-bottom:28px}.evt{padding:14px 0;border-bottom:1px solid #111;font-size:13px;color:${SMIC.muted};text-align:left}.evt strong{color:${SMIC.gold};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;display:inline-block;min-width:100px}.deadline{font-size:11px;color:${SMIC.dim};margin-top:16px}.btn{${GOLD_BTN}}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card">${goldBar('You\'re Invited')}<div class="content"><div class="label">${v.eventName || ''}</div><h1 class="h1">${v.heading || ''}</h1><p class="body">${v.body || ''}</p><div class="event-details"><div class="evt"><strong>Event</strong>${v.eventName || ''}</div><div class="evt"><strong>Date</strong>${v.date || ''}</div><div class="evt"><strong>Venue</strong>${v.venue || ''}</div></div>${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}${v.rsvpDeadline ? `<div class="deadline">RSVP by ${v.rsvpDeadline}</div>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rSystemAlert(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.sev{padding:8px;text-align:center;font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#080808}.sev.warning{background:#C9963A}.sev.critical{background:#c94c3a}.sev.info{background:#3a8ec9}.content{padding:40px;color:${SMIC.text}}.label{font-size:9px;color:${SMIC.gold};letter-spacing:0.3em;text-transform:uppercase;display:block;margin-bottom:10px}.h1{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;margin:0 0 20px;line-height:1.1;text-align:center}.h1 em{font-style:italic;color:${SMIC.gold}}.body{font-size:14px;line-height:1.8;color:${SMIC.muted};margin-bottom:24px}.timing{border-top:1px solid ${SMIC.borderLight};padding-top:20px;margin-bottom:20px}.time-row{padding:10px 0;border-bottom:1px solid #111;font-size:13px;color:${SMIC.muted}}.time-row strong{color:${SMIC.gold};font-size:10px;letter-spacing:0.15em;text-transform:uppercase;display:inline-block;min-width:100px}.impact{padding:16px 20px;background:#080808;border:1px solid ${SMIC.borderLight};font-size:12px;color:${SMIC.muted};line-height:1.7}.impact strong{color:${SMIC.gold};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;display:block;margin-bottom:6px}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="sev ${(v.severity || 'info').toLowerCase()}">${v.severity || 'Info'}</div><div class="content"><h1 class="h1">${v.heading || ''}</h1><p class="body">${v.body || ''}</p><div class="timing"><div class="time-row"><strong>Start</strong>${v.startTime || ''}</div><div class="time-row"><strong>End</strong>${v.endTime || ''}</div></div>${v.impact ? `<div class="impact"><strong>Impact</strong>${v.impact}</div>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rPasswordReset(v: Record<string, string>): string {
  return `<!DOCTYPE html><html><head>${HEAD}<style>${BASE_CSS}.outer{background:${SMIC.bg};padding:40px 20px}.card{${CARD}}.header{padding:40px;text-align:center;border-bottom:1px solid ${SMIC.borderLight}}.content{padding:40px;text-align:center;color:${SMIC.text}}.h1{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:300;margin:0 0 20px;line-height:1.1}.h1 em{font-style:italic;color:${SMIC.gold}}.body{font-size:15px;line-height:1.8;color:${SMIC.muted};margin-bottom:30px}.btn{${GOLD_BTN}}.note{margin-top:24px;font-size:11px;color:${SMIC.dim};line-height:1.6}.footer{${FOOTER}}</style></head><body><div class="outer"><div class="card"><div class="header">${logoBlock()}</div><div class="content"><h1 class="h1">${v.heading || ''}</h1><p class="body">${v.body || ''}</p>${v.cta ? `<a href="${v.ctaUrl || '#'}" class="btn">${v.cta}</a>` : ''}${v.note ? `<div class="note">${v.note}</div>` : ''}</div>${footer()}</div></div></body></html>`;
}

function rCompanyProfileFull(v: Record<string, string>): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SMIC360 Limited — Advertising | Branding | Marketing</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>

<body style="margin:0;padding:0;background:#000000;font-family:'DM Sans',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:32px 0;">
<tr><td align="center">

<table width="768" cellpadding="0" cellspacing="0" style="max-width:768px;width:100%;">

<tr>
<td style="background:#1A1208;padding:10px 28px;border-radius:12px 12px 0 0;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="color:#9A8C7A;font-size:11px;letter-spacing:2px;font-family:'DM Sans',Arial,sans-serif;font-weight:500;">
        EST. 2006 &middot; ACCRA, GHANA
      </td>
      <td align="right" style="color:#9A8C7A;font-size:11px;letter-spacing:1px;font-family:'DM Sans',Arial,sans-serif;">
        <a href="tel:+233203361155" style="color:#C9A84C;text-decoration:none;">020 336 1155</a>
        &nbsp;&middot;&nbsp;
        <a href="tel:+233541665108" style="color:#C9A84C;text-decoration:none;">054 166 5108</a>
      </td>
    </tr>
  </table>
</td>
</tr>

<tr>
<td style="background:#1A1208;padding:0;position:relative;">
  <img src="${HERO_IMG}"
       alt="SMIC360 — Premium Advertising Agency"
       style="width:100%;height:480px;object-fit:cover;object-position:top;display:block;opacity:0.55;">
  <table width="100%" cellpadding="0" cellspacing="0" style="position:relative;margin-top:-180px;">
    <tr>
      <td style="padding:0 48px 48px;">
        <div style="width:52px;height:3px;background:#C9A84C;margin-bottom:22px;"></div>
        <div style="margin-bottom:12px;">
          <img src="${LOGO_CLOUD}"
               alt="SMIC360 Logo"
               style="width:72px;height:72px;object-fit:contain;border-radius:8px;display:block;">
        </div>
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:46px;font-weight:900;
                    color:#FFFFFF;line-height:1;letter-spacing:-1px;margin-bottom:6px;">
          SMIC<span style="color:#C9A84C;">360</span>
        </div>
        <div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:500;
                    letter-spacing:5px;color:#C9A84C;text-transform:uppercase;margin-bottom:28px;">
          Limited
        </div>
        <div style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;font-weight:300;
                    letter-spacing:4px;color:#D8CCBA;text-transform:uppercase;">
                  Advertising &amp; Marketing &nbsp;|&nbsp; Real Estate Development &nbsp;|&nbsp; Procurement &amp; Supply Solutions
        </div>
      </td>
    </tr>
  </table>
</td>
</tr>

<tr>
<td style="background:#C9A84C;padding:20px 48px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;
                    color:#1A1208;line-height:1.3;">
          ${v.headline || ''}
        </div>
      </td>
      <td width="120" align="right" style="padding-left:20px;">
        <a href="mailto:smic360ltd@gmail.com"
           style="display:inline-block;background:#1A1208;color:#C9A84C;
                  font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                  text-decoration:none;padding:10px 18px;border-radius:6px;
                  letter-spacing:1px;white-space:nowrap;">
          GET IN TOUCH
        </a>
      </td>
    </tr>
  </table>
</td>
</tr>

<tr>
<td style="background:#FEFCF7;padding:52px 48px 44px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td width="54%" style="vertical-align:top;padding-right:32px;">
        <div style="font-size:10px;font-weight:600;letter-spacing:4px;color:#C9A84C;
                    text-transform:uppercase;margin-bottom:14px;">Who We Are</div>
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:30px;font-weight:700;
                    color:#1A1208;line-height:1.2;margin-bottom:20px;">
          ${v.whoHeading || ''}
        </div>
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#4A4036;
                  line-height:1.85;margin:0 0 18px;">
          ${v.whoBody1 || ''}
        </p>
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#4A4036;
                  line-height:1.85;margin:0;">
          ${v.whoBody2 || ''}
        </p>
      </td>
      <td width="46%" style="vertical-align:top;">
        <img src="${TEAM_IMG}"
             alt="SMIC360 team"
             style="width:100%;height:360px;object-fit:cover;object-position:top;border-radius:10px;display:block;">
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
          <tr>
            <td style="padding:2px;">
              <div style="background:#1A1208;border-radius:8px;padding:12px 14px;text-align:center;">
                <div style="font-family:'Playfair Display',serif;font-size:22px;color:#C9A84C;font-weight:700;">18+</div>
                <div style="font-size:10px;color:#9A8C7A;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px;">Years Active</div>
              </div>
            </td>
            <td style="padding:2px;">
              <div style="background:#1A1208;border-radius:8px;padding:12px 14px;text-align:center;">
                <div style="font-family:'Playfair Display',serif;font-size:22px;color:#C9A84C;font-weight:700;">30+</div>
                <div style="font-size:10px;color:#9A8C7A;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px;">Clients Served</div>
              </div>
            </td>
            <td style="padding:2px;">
              <div style="background:#1A1208;border-radius:8px;padding:12px 14px;text-align:center;">
                <div style="font-family:'Playfair Display',serif;font-size:22px;color:#C9A84C;font-weight:700;">3</div>
                <div style="font-size:10px;color:#9A8C7A;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px;">Core Pillars</div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</td>
</tr>

<tr>
<td style="background:#1A1208;padding:40px 48px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td width="50%" style="vertical-align:top;padding-right:24px;border-right:1px solid #2E2518;">
        <div style="font-size:10px;font-weight:600;letter-spacing:3px;color:#C9A84C;
                    text-transform:uppercase;margin-bottom:10px;">Our Vision</div>
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#D8CCBA;
                  line-height:1.8;margin:0;">
          ${v.vision || ''}
        </p>
      </td>
      <td width="50%" style="vertical-align:top;padding-left:24px;">
        <div style="font-size:10px;font-weight:600;letter-spacing:3px;color:#C9A84C;
                    text-transform:uppercase;margin-bottom:10px;">Our Mission</div>
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#D8CCBA;
                  line-height:1.8;margin:0;">
          ${v.mission || ''}
        </p>
      </td>
    </tr>
  </table>
</td>
</tr>

<tr>
<td style="background:#FEFCF7;padding:52px 48px 8px;">
  <div style="font-size:10px;font-weight:600;letter-spacing:4px;color:#C9A84C;
              text-transform:uppercase;margin-bottom:12px;">Our Core Solutions</div>
  <div style="font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:700;
              color:#1A1208;line-height:1.2;">
    A Fully Integrated 360&deg; Approach
  </div>
  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#4A4036;
            line-height:1.85;margin:18px 0 0;">
    At SMIC360, we drive growth by aligning strategy with execution across three critical business pillars. We eliminate fragmentation by providing seamless, results-driven experiences across the entire value chain.
  </p>
  <div style="width:44px;height:3px;background:#C9A84C;margin-top:18px;"></div>
</td>
</tr>

<tr>
<td style="background:#FEFCF7;padding:28px 48px 0;">
  <div style="background:#1A1208;border-radius:10px;overflow:hidden;">
    <img src="${HERO_IMG}"
         alt="Advertising &amp; Marketing"
         style="width:100%;height:220px;object-fit:cover;object-position:top;display:block;opacity:0.75;">
    <div style="padding:28px 28px 24px;">
      <div style="font-size:9px;font-weight:600;letter-spacing:3px;color:#C9A84C;
                  text-transform:uppercase;margin-bottom:8px;">I</div>
      <div style="font-family:'Playfair Display',serif;font-size:20px;color:#fff;
                  font-weight:700;margin-bottom:8px;">Advertising &amp; Marketing</div>
      <p style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#9A8C7A;
                line-height:1.7;margin:0 0 22px;">
        Laying the Foundation for Brand Power &amp; Market Dominance &mdash; a comprehensive ecosystem of creative and strategic services designed to build powerful, memorable brands that achieve sustainable growth.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="50%" style="vertical-align:top;padding-right:14px;padding-bottom:16px;">
            <div style="border-left:2px solid #C9A84C;padding-left:12px;">
              <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                          color:#fff;margin-bottom:5px;">Strategy &amp; Advisory</div>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9A8C7A;
                        line-height:1.65;margin:0;">
                We define your path to success through brand positioning, market entry strategies, and data-informed business advisory.
              </p>
            </div>
          </td>
          <td width="50%" style="vertical-align:top;padding-left:14px;padding-bottom:16px;">
            <div style="border-left:2px solid #C9A84C;padding-left:12px;">
              <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                          color:#fff;margin-bottom:5px;">Branding &amp; Creative</div>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9A8C7A;
                        line-height:1.65;margin:0;">
                Our team crafts compelling corporate identities and visual communication designs that resonate across digital and traditional platforms.
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td width="50%" style="vertical-align:top;padding-right:14px;">
            <div style="border-left:2px solid #C9A84C;padding-left:12px;">
              <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                          color:#fff;margin-bottom:5px;">Campaign Execution</div>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9A8C7A;
                        line-height:1.65;margin:0;">
                We bring ideas to life through integrated marketing, leveraging social media, search, and high-impact experiential activations.
              </p>
            </div>
          </td>
          <td width="50%" style="vertical-align:top;padding-left:14px;">
            <div style="border-left:2px solid #C9A84C;padding-left:12px;">
              <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                          color:#fff;margin-bottom:5px;">Media &amp; Production</div>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9A8C7A;
                        line-height:1.65;margin:0;">
                We maximise your reach through expert media buying, out-of-home (OOH) execution, and high-quality print management.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</td>
</tr>

<tr>
<td style="background:#FEFCF7;padding:14px 48px 0;">
  <div style="background:#1A1208;border-radius:10px;overflow:hidden;">
    <img src="${RE_IMG}"
         alt="Real Estate Development"
         style="width:100%;height:220px;object-fit:cover;object-position:top;display:block;opacity:0.75;">
    <div style="padding:28px 28px 24px;">
      <div style="font-size:9px;font-weight:600;letter-spacing:3px;color:#C9A84C;
                  text-transform:uppercase;margin-bottom:8px;">II</div>
      <div style="font-family:'Playfair Display',serif;font-size:20px;color:#fff;
                  font-weight:700;margin-bottom:8px;">Real Estate Development</div>
      <p style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#9A8C7A;
                line-height:1.7;margin:0 0 22px;">
        Transforming Potential into Premium Assets &mdash; our real estate division focuses on the full lifecycle of property development and asset management, ensuring architectural excellence and maximum investment value.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="50%" style="vertical-align:top;padding-right:14px;padding-bottom:16px;">
            <div style="border-left:2px solid #C9A84C;padding-left:12px;">
              <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                          color:#fff;margin-bottom:5px;">Property Development &amp; Strategic Sales</div>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9A8C7A;
                        line-height:1.65;margin:0;">
                We manage everything from land acquisition and project feasibility to the construction of modern residential and commercial complexes.
              </p>
            </div>
          </td>
          <td width="50%" style="vertical-align:top;padding-left:14px;padding-bottom:16px;">
            <div style="border-left:2px solid #C9A84C;padding-left:12px;">
              <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                          color:#fff;margin-bottom:5px;">Property Leasing &amp; Asset Management</div>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9A8C7A;
                        line-height:1.65;margin:0;">
                We specialise in the curation of premium rental portfolios, including furnished apartments and executive stays.
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td width="50%" style="vertical-align:top;padding-right:14px;">
            <div style="border-left:2px solid #C9A84C;padding-left:12px;">
              <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                          color:#fff;margin-bottom:5px;">Operational Excellence</div>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9A8C7A;
                        line-height:1.65;margin:0;">
                Our services include rigorous tenant screening, lease administration, and proactive maintenance to preserve long-term asset value.
              </p>
            </div>
          </td>
          <td width="50%" style="vertical-align:top;padding-left:14px;">
            <div style="border-left:2px solid #C9A84C;padding-left:12px;">
              <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                          color:#fff;margin-bottom:5px;">Hospitality Services</div>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9A8C7A;
                        line-height:1.65;margin:0;">
                We provide concierge-level support for short-term rentals and guest services.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</td>
</tr>

<tr>
<td style="background:#FEFCF7;padding:14px 48px 44px;">
  <div style="background:#1A1208;border-radius:10px;overflow:hidden;">
    <img src="${PROC_IMG}"
         alt="Procurement &amp; Supply Solutions"
         style="width:100%;height:220px;object-fit:cover;object-position:top;display:block;opacity:0.75;">
    <div style="padding:28px 28px 24px;">
      <div style="font-size:9px;font-weight:600;letter-spacing:3px;color:#C9A84C;
                  text-transform:uppercase;margin-bottom:8px;">III</div>
      <div style="font-family:'Playfair Display',serif;font-size:20px;color:#fff;
                  font-weight:700;margin-bottom:8px;">Procurement &amp; Supply Solutions</div>
      <p style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#9A8C7A;
                line-height:1.7;margin:0 0 22px;">
        Streamlining Global Sourcing with Precision and Reliability &mdash; we act as your dedicated sourcing partner, simplifying complex supply chains to deliver high-quality materials and equipment at competitive prices.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="50%" style="vertical-align:top;padding-right:14px;padding-bottom:16px;">
            <div style="border-left:2px solid #C9A84C;padding-left:12px;">
              <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                          color:#fff;margin-bottom:5px;">Strategic Sourcing &amp; Cost Efficiency</div>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9A8C7A;
                        line-height:1.65;margin:0;">
                Leverage our extensive network to secure the best suppliers and negotiate competitive pricing, reducing your operational costs.
              </p>
            </div>
          </td>
          <td width="50%" style="vertical-align:top;padding-left:14px;padding-bottom:16px;">
            <div style="border-left:2px solid #C9A84C;padding-left:12px;">
              <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                          color:#fff;margin-bottom:5px;">Quality &amp; Reliability</div>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9A8C7A;
                        line-height:1.65;margin:0;">
                We prioritise stringent quality assurance and coordinate complex logistics to ensure every item is delivered on time and to specification.
              </p>
            </div>
          </td>
        </tr>
      </table>
      <div style="border-left:2px solid #C9A84C;padding-left:12px;margin-bottom:0;">
        <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                    color:#fff;margin-bottom:10px;">Diverse Sourcing Capabilities</div>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="50%" style="vertical-align:top;padding-right:14px;padding-bottom:10px;">
              <div style="background:#2E2518;border-radius:6px;padding:12px 14px;">
                <div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:600;
                            color:#C9A84C;margin-bottom:4px;">Industrial &amp; Commercial</div>
                <p style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#9A8C7A;
                          line-height:1.6;margin:0;">
                  Machinery, specialised tools, and safety equipment (PPE).
                </p>
              </div>
            </td>
            <td width="50%" style="vertical-align:top;padding-left:14px;padding-bottom:10px;">
              <div style="background:#2E2518;border-radius:6px;padding:12px 14px;">
                <div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:600;
                            color:#C9A84C;margin-bottom:4px;">Construction Materials</div>
                <p style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#9A8C7A;
                          line-height:1.6;margin:0;">
                  High-grade cement, steel, roofing, and electrical fittings.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td width="50%" style="vertical-align:top;padding-right:14px;">
              <div style="background:#2E2518;border-radius:6px;padding:12px 14px;">
                <div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:600;
                            color:#C9A84C;margin-bottom:4px;">Bulk Commodities</div>
                <p style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#9A8C7A;
                          line-height:1.6;margin:0;">
                  Industrial and edible salt, and diverse raw materials for manufacturing.
                </p>
              </div>
            </td>
            <td width="50%" style="vertical-align:top;padding-left:14px;">
              <div style="background:#2E2518;border-radius:6px;padding:12px 14px;">
                <div style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:600;
                            color:#C9A84C;margin-bottom:4px;">Household &amp; Specialised Items</div>
                <p style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#9A8C7A;
                          line-height:1.6;margin:0;">
                  Premium appliances, hard-to-find components, and custom-order products.
                </p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</td>
</tr>

<tr>
<td style="background:#C9A84C;padding:28px 48px;">
  <div style="text-align:center;">
    <div style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;
                color:#1A1208;line-height:1.4;letter-spacing:0.5px;">
      Building Foundations. &nbsp; Branding Futures. &nbsp; Connecting Markets.
    </div>
  </div>
</td>
</tr>

<tr>
<td style="background:#1A1208;padding:52px 48px;">
  <div style="font-size:10px;font-weight:600;letter-spacing:4px;color:#C9A84C;
              text-transform:uppercase;margin-bottom:12px;">Our Approach</div>
  <div style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:700;
              color:#fff;line-height:1.2;margin-bottom:32px;">
    A Structured Process,<br>Guaranteed Results
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
    <tr>
      <td width="42" style="vertical-align:top;padding-right:16px;">
        <div style="width:38px;height:38px;background:#C9A84C;border-radius:50%;
                    text-align:center;line-height:38px;font-family:'Playfair Display',serif;
                    font-size:16px;color:#1A1208;font-weight:700;">1</div>
      </td>
      <td style="vertical-align:top;">
        <div style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:600;
                    color:#fff;margin-bottom:4px;">Consultancy Work</div>
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#9A8C7A;
                  line-height:1.7;margin:0;">
          We meet to assess your needs, agree on budget and timelines, carry out research,
          then present a tailored implementation plan.
        </p>
      </td>
    </tr>
  </table>

  <div style="border-top:1px solid #2E2518;margin:0 0 20px;"></div>

  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
    <tr>
      <td width="42" style="vertical-align:top;padding-right:16px;">
        <div style="width:38px;height:38px;background:#C9A84C;border-radius:50%;
                    text-align:center;line-height:38px;font-family:'Playfair Display',serif;
                    font-size:16px;color:#1A1208;font-weight:700;">2</div>
      </td>
      <td style="vertical-align:top;">
        <div style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:600;
                    color:#fff;margin-bottom:4px;">Concept &amp; Campaign</div>
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#9A8C7A;
                  line-height:1.7;margin:0;">
          We develop creative concepts, layouts, PR interventions and media placements
          targeted to your audience.
        </p>
      </td>
    </tr>
  </table>

  <div style="border-top:1px solid #2E2518;margin:0 0 20px;"></div>

  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
    <tr>
      <td width="42" style="vertical-align:top;padding-right:16px;">
        <div style="width:38px;height:38px;background:#C9A84C;border-radius:50%;
                    text-align:center;line-height:38px;font-family:'Playfair Display',serif;
                    font-size:16px;color:#1A1208;font-weight:700;">3</div>
      </td>
      <td style="vertical-align:top;">
        <div style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:600;
                    color:#fff;margin-bottom:4px;">Implementation &amp; Monitoring</div>
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#9A8C7A;
                  line-height:1.7;margin:0;">
          We execute and monitor all activities with precision, then present a full
          performance report for evaluation.
        </p>
      </td>
    </tr>
  </table>

  <div style="border-top:1px solid #2E2518;margin:0 0 20px;"></div>

  <div style="background:#C9A84C;border-radius:8px;padding:18px 22px;margin-top:8px;">
    <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:600;
                letter-spacing:2px;color:#1A1208;text-transform:uppercase;margin-bottom:6px;">
      Flexible Payment Options
    </div>
    <div style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#1A1208;line-height:1.7;">
      <strong>Pay Per Project</strong> &mdash; pay individually for each task or campaign &nbsp;|&nbsp;
      <strong>Retainer Package</strong> &mdash; flat monthly or quarterly fee covering Creative, Marketing,
      Media/PR, or our full <em>General Retainer</em> for all-inclusive service with no extra charges.
    </div>
  </div>
</td>
</tr>

<tr>
<td style="background:#FEFCF7;padding:52px 48px;">
  <div style="font-size:10px;font-weight:600;letter-spacing:4px;color:#C9A84C;
              text-transform:uppercase;margin-bottom:12px;">Client Testimonials</div>
  <div style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:700;
              color:#1A1208;margin-bottom:32px;">Words from Those We've Served</div>

  <div style="background:#fff;border-left:4px solid #C9A84C;border-radius:0 8px 8px 0;
              padding:22px 24px;margin-bottom:18px;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
    <p style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#4A4036;
              line-height:1.8;margin:0 0 14px;font-style:italic;">
      &ldquo;Despite our tight deadlines, we could still count on their creativity and delivery
      which met our demands and the evolving market of our organization.&rdquo;
    </p>
    <div style="font-size:12px;font-weight:600;color:#1A1208;letter-spacing:1px;">
      Suleiman Habuba, Media Director
    </div>
    <div style="font-size:11px;color:#9A8C7A;margin-top:2px;">
      Confederation of African Football (CAF)
    </div>
  </div>

  <div style="background:#fff;border-left:4px solid #C9A84C;border-radius:0 8px 8px 0;
              padding:22px 24px;margin-bottom:18px;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
    <p style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#4A4036;
              line-height:1.8;margin:0 0 14px;font-style:italic;">
      &ldquo;If anyone knows BRANDING, this is the place to go for a good image and awesome
      communicative artworks. Thanks so much for my design.&rdquo;
    </p>
    <div style="font-size:12px;font-weight:600;color:#1A1208;letter-spacing:1px;">Katherine</div>
    <div style="font-size:11px;color:#9A8C7A;margin-top:2px;">Montessori Training Center</div>
  </div>

  <div style="background:#fff;border-left:4px solid #C9A84C;border-radius:0 8px 8px 0;
              padding:22px 24px;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
    <p style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#4A4036;
              line-height:1.8;margin:0 0 14px;font-style:italic;">
      &ldquo;It is as if the company knew my needs even before I could tell them! They have the
      ability to work within your budget and produce with topmost quality.&rdquo;
    </p>
    <div style="font-size:12px;font-weight:600;color:#1A1208;letter-spacing:1px;">
      Clara Pinkrah-Sam, CEO
    </div>
    <div style="font-size:11px;color:#9A8C7A;margin-top:2px;">Claturally Natural Hair</div>
  </div>
</td>
</tr>

<tr>
  <td style="background:#1A1208;padding:40px 48px;text-align:center;">
    <div style="font-size:10px;font-weight:600;letter-spacing:4px;color:#C9A84C;
                text-transform:uppercase;margin-bottom:20px;font-family:'DM Sans',Arial,sans-serif;">
      Brands We've Worked With
    </div>
    <img src="${BRANDS_IMG}"
         alt="Brands We've Worked With"
         style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border-radius:8px;">
  </td>
</tr>

<tr>
<td style="padding:0;">
  <div style="position:relative;">
    <img src="${CTA_BG}"
         alt="Ready to grow"
         style="width:100%;height:360px;object-fit:cover;object-position:top;display:block;filter:brightness(0.35);">
    <table width="100%" cellpadding="0" cellspacing="0"
           style="position:absolute;top:0;left:0;height:360px;">
      <tr>
        <td style="text-align:center;vertical-align:middle;padding:40px;">
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:900;
                      color:#fff;margin-bottom:10px;line-height:1.2;">
            ${v.ctaHeading || ''}
          </div>
          <div style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#D8CCBA;
                      margin-bottom:28px;">
            ${v.ctaSubtext || ''}
          </div>
          <a href="mailto:smic360ltd@gmail.com"
             style="display:inline-block;background:#C9A84C;color:#1A1208;font-weight:700;
                    font-size:13px;text-decoration:none;padding:14px 32px;border-radius:8px;
                    letter-spacing:1.5px;font-family:'DM Sans',Arial,sans-serif;margin-right:10px;">
            EMAIL US NOW
          </a>
          <a href="tel:+233203361155"
             style="display:inline-block;background:transparent;color:#C9A84C;font-weight:700;
                    font-size:13px;text-decoration:none;padding:13px 28px;border-radius:8px;
                    letter-spacing:1.5px;border:2px solid #C9A84C;font-family:'DM Sans',Arial,sans-serif;">
            CALL US
          </a>
        </td>
      </tr>
    </table>
  </div>
</td>
</tr>

<tr>
<td style="background:#0E0B06;padding:40px 48px 28px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td width="50%" style="vertical-align:top;padding-right:24px;">
        <div style="margin-bottom:10px;">
          <img src="${LOGO_CLOUD}"
               alt="SMIC360 Logo"
               style="width:48px;height:48px;object-fit:contain;border-radius:6px;display:inline-block;vertical-align:middle;margin-right:10px;">
          <span style="font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:900;
                      color:#fff;letter-spacing:-0.5px;vertical-align:middle;">
            SMIC<span style="color:#C9A84C;">360</span> <span style="font-size:14px;color:#C9A84C;font-weight:400;letter-spacing:1px;">LIMITED</span>
          </span>
        </div>
        <div style="font-size:10px;letter-spacing:3px;color:#6B5F51;text-transform:uppercase;
                    margin-bottom:22px;">Advertising &middot; Branding &middot; Marketing</div>
        <div style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#9A8C7A;
                    line-height:1.9;">
          1st Floor, Verostina House<br>
          Opp. DSTV Office, Comm. 18<br>
          Off Spintex Road, Accra, Ghana
        </div>
      </td>
      <td width="50%" style="vertical-align:top;padding-left:24px;border-left:1px solid #2E2518;">
        <div style="font-size:10px;font-weight:600;letter-spacing:3px;color:#C9A84C;
                    text-transform:uppercase;margin-bottom:16px;">Get In Touch</div>
        <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
          <tr>
            <td style="width:20px;vertical-align:top;">
              <span style="color:#C9A84C;font-size:14px;">&#128222;</span>
            </td>
            <td style="padding-left:8px;">
              <a href="tel:+233203361155"
                 style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#fff;
                        text-decoration:none;font-weight:500;">020 336 1155</a>
            </td>
          </tr>
        </table>
        <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
          <tr>
            <td style="width:20px;vertical-align:top;">
              <span style="color:#C9A84C;font-size:14px;">&#128222;</span>
            </td>
            <td style="padding-left:8px;">
              <a href="tel:+233541665108"
                 style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#fff;
                        text-decoration:none;font-weight:500;">054 166 5108</a>
            </td>
          </tr>
        </table>
        <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
          <tr>
            <td style="width:20px;vertical-align:top;">
              <span style="color:#C9A84C;font-size:14px;">&#9993;</span>
            </td>
            <td style="padding-left:8px;">
              <a href="mailto:smic360ltd@gmail.com"
                 style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#C9A84C;
                        text-decoration:none;font-weight:500;">smic360ltd@gmail.com</a>
            </td>
          </tr>
        </table>
        <table cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
          <tr>
            <td style="width:20px;vertical-align:top;">
              <span style="color:#C9A84C;font-size:14px;">&#127760;</span>
            </td>
            <td style="padding-left:8px;">
              <a href="http://www.smic360.com"
                 style="font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#C9A84C;
                        text-decoration:none;font-weight:500;">www.smic360.com</a>
            </td>
          </tr>
        </table>
        <div style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#6B5F51;">
          <span style="color:#C9A84C;">f</span> @smic360limited &nbsp;&middot;&nbsp;
          <span style="color:#C9A84C;">&#9673;</span> smic360_limited
        </div>
      </td>
    </tr>
  </table>
</td>
</tr>

<tr>
<td style="background:#080603;padding:16px 48px;border-radius:0 0 12px 12px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#3D3228;">
        &copy; 2026 SMIC360 Limited. All rights reserved. Accra, Ghana.
      </td>
      <td align="right" style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#3D3228;">
        <a href="#" style="color:#3D3228;text-decoration:none;">Unsubscribe</a>
      </td>
    </tr>
  </table>
</td>
</tr>

</table>
</td></tr>
</table>

</body>
</html>`;
}
