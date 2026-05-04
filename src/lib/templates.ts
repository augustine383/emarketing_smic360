
export interface EmailTemplate {
  id: string;
  title: string;
  category: string;
  html: string;
}

const LOGO_URL = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg";

export const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: 'welcome',
    title: 'Welcome Email',
    category: 'Onboarding',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400&family=DM+Sans:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; background-color: #050505; font-family: 'DM Sans', sans-serif; }
    .outer { background-color: #050505; padding: 40px 20px; }
    .card { max-width: 600px; margin: 0 auto; background-color: #0C0C0C; border: 1px solid rgba(201,150,58,0.15); overflow: hidden; }
    .header { padding: 40px; text-align: center; border-bottom: 1px solid rgba(201,150,58,0.1); }
    .logo { width: 80px; height: 80px; border-radius: 6%; margin-bottom: 20px; border: 1px solid rgba(201,150,58,0.2); }
    .content { padding: 40px; text-align: center; color: #F5F0E8; }
    .h1 { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 300; margin: 0 0 20px; line-height: 1.1; }
    .h1 em { font-style: italic; color: #C9963A; }
    .body { font-size: 15px; line-height: 1.8; color: #888; margin-bottom: 30px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #C9963A, #E8C06A); color: #080808; padding: 16px 40px; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; }
    .footer { padding: 30px; text-align: center; color: #444; font-size: 10px; letter-spacing: 0.1em; border-top: 1px solid rgba(201,150,58,0.05); }
  </style>
</head>
<body>
  <div class="outer">
    <div class="card">
      <div class="header">
        <img src="${LOGO_URL}" alt="SMIC360" class="logo">
      </div>
      <div class="content">
        <h1 class="h1">Welcome to the <em>Inner Circle</em></h1>
        <p class="body">You have successfully joined SMIC360 Ltd. We are dedicated to providing the world's most refined communication tools, tailored for excellence.</p>
        <a href="#" class="btn">Access the Vault</a>
      </div>
      <div class="footer">
        &copy; 2024 SMIC360 Ltd. Professional Solutions &bull; Exclusive Member Access
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'product-update',
    title: 'Product Update',
    category: 'Product',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400&family=DM+Sans:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; background-color: #050505; font-family: 'DM Sans', sans-serif; }
    .outer { background-color: #050505; padding: 40px 20px; }
    .card { max-width: 600px; margin: 0 auto; background-color: #0C0C0C; border: 1px solid rgba(201,150,58,0.15); overflow: hidden; }
    .ticker { background: linear-gradient(90deg, #C9963A, #E8C06A, #C9963A); padding: 8px; text-align: center; font-size: 9px; font-weight: 700; letter-spacing: 0.3em; color: #080808; text-transform: uppercase; }
    .hero { padding: 40px; text-align: center; border-bottom: 1px solid rgba(201,150,58,0.1); }
    .logo { width: 60px; height: 60px; border-radius: 6%; border: 1px solid rgba(201,150,58,0.2); }
    .content { padding: 48px; color: #F5F0E8; text-align: center; }
    .label { color: #C9963A; font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; margin-bottom: 12px; display: block; }
    .h2 { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; margin: 0 0 16px; }
    .body { color: #888; font-size: 14px; line-height: 1.8; margin-bottom: 24px; }
    .feature { border-left: 1px solid #C9963A; padding-left: 20px; margin: 20px 0; color: #aaa; font-style: italic; text-align: left; }
  </style>
</head>
<body>
  <div class="outer">
    <div class="card">
      <div class="ticker">SMIC360 &bull; Release Notes &bull; Version 2.4.0</div>
      <div class="hero">
        <img src="${LOGO_URL}" alt="SMIC360" class="logo">
      </div>
      <div class="content">
        <span class="label">Evolution</span>
        <h2 class="h2">The Future is <em>Seamless</em></h2>
        <p class="body">We have refined the core engine of SMIC360 Ltd. Experience faster processing and enhanced security protocols designed for high-stakes environments.</p>
        <div class="feature">
          "The most significant upgrade in our history, bringing unparalleled precision to your operations."
        </div>
        <p class="body">Access the next generation of professional tools.</p>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'invoice',
    title: 'Invoice Receipt',
    category: 'Billing',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body { background: #050505; font-family: 'DM Sans', sans-serif; color: #888; margin: 0; padding: 0; }
    .outer { padding: 40px 20px; }
    .invoice { max-width: 700px; margin: 0 auto; background: #0C0C0C; border: 1px solid rgba(201,150,58,0.15); padding: 50px; }
    .header { border-bottom: 1px solid rgba(201,150,58,0.1); padding-bottom: 30px; margin-bottom: 40px; }
    .logo { width: 50px; height: 50px; border-radius: 6%; float: left; border: 1px solid rgba(201,150,58,0.2); }
    .brand { float: left; margin-left: 15px; font-family: 'Cormorant Garamond', serif; font-size: 24px; color: #C9963A; padding-top: 10px; }
    .invoice-id { float: right; text-align: right; font-size: 11px; letter-spacing: 0.1em; padding-top: 15px; color: #555; }
    .clear { clear: both; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #555; padding-bottom: 15px; border-bottom: 1px solid #1a1a1a; }
    td { padding: 20px 0; border-bottom: 1px solid #111; color: #aaa; font-size: 14px; }
    .total-row td { border: none; color: #F5F0E8; font-size: 18px; font-family: 'Cormorant Garamond', serif; padding-top: 30px; }
  </style>
</head>
<body>
  <div class="outer">
    <div class="invoice">
      <div class="header">
        <img src="${LOGO_URL}" class="logo">
        <div class="brand">SMIC360 Ltd</div>
        <div class="invoice-id">INVOICE #0824-A9<br>AUGUST 24, 2024</div>
        <div class="clear"></div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Premium Enterprise Vault Subscription (Monthly)</td>
            <td style="text-align: right;">$499.00</td>
          </tr>
          <tr>
            <td>API Dedicated Priority Support</td>
            <td style="text-align: right;">$150.00</td>
          </tr>
          <tr class="total-row">
            <td style="color: #555; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Total Due</td>
            <td style="text-align: right; color: #C9963A;">$649.00 USD</td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top: 60px; text-align: center; font-size: 9px; letter-spacing: 0.2em; color: #333; text-transform: uppercase;">
        Thank you for choosing SMIC360 Excellence
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'password-reset',
    title: 'Password Reset',
    category: 'Security',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    body { background: #050505; font-family: 'DM Sans', sans-serif; margin: 0; padding: 0; }
    .card { max-width: 450px; margin: 60px auto; background: #0C0C0C; border: 1px solid rgba(201,150,58,0.2); padding: 50px; text-align: center; overflow: hidden; }
    .logo { width: 60px; height: 60px; border-radius: 6%; margin-bottom: 30px; border: 1px solid rgba(201,150,58,0.2); }
    .h2 { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; color: #F5F0E8; margin-bottom: 20px; }
    .body { font-size: 14px; color: #666; line-height: 1.7; margin-bottom: 30px; }
    .btn { display: inline-block; background: #000; color: #C9963A; border: 1px solid #C9963A; padding: 14px 30px; text-decoration: none; font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="card">
    <img src="${LOGO_URL}" class="logo">
    <h2 class="h2">Security <em>Verification</em></h2>
    <p class="body">A request has been made to access your SMIC360 Ltd account credentials. If this was you, please authorize the reset below.</p>
    <a href="#" class="btn">Confirm Identity</a>
    <p style="margin-top: 40px; font-size: 10px; color: #333; letter-spacing: 0.05em;">Authorized Session Only</p>
  </div>
</body>
</html>`
  },
  {
    id: 'newsletter',
    title: 'Weekly Insights',
    category: 'Marketing',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400&display=swap" rel="stylesheet">
  <style>
    body { background: #050505; font-family: 'DM Sans', sans-serif; margin: 0; padding: 0; }
    .container { max-width: 650px; margin: 0 auto; background: #0C0C0C; border: 1px solid rgba(201,150,58,0.1); overflow: hidden; }
    .header { padding: 50px 40px; text-align: center; background: #080808; border-bottom: 1px solid rgba(201,150,58,0.1); }
    .logo { width: 50px; height: 50px; border-radius: 6%; margin-bottom: 15px; border: 1px solid rgba(201,150,58,0.2); }
    .brand-name { font-family: 'Cormorant Garamond', serif; font-size: 36px; color: #F5F0E8; letter-spacing: 0.1em; margin-bottom: 5px; }
    .issue { font-size: 9px; color: #C9963A; letter-spacing: 0.4em; text-transform: uppercase; }
    .article { padding: 40px; border-bottom: 1px solid #111; }
    .cat { font-size: 9px; color: #555; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 10px; display: block; }
    .title { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #F5F0E8; line-height: 1.3; margin-bottom: 15px; font-weight: 300; }
    .excerpt { font-size: 14px; color: #888; line-height: 1.8; margin-bottom: 20px; }
    .link { color: #C9963A; text-decoration: none; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${LOGO_URL}" class="logo">
      <div class="brand-name">SMIC360 <em>Insights</em></div>
      <div class="issue">Issue No. 124 &bull; Volume 4</div>
    </div>
    <div class="article">
      <span class="cat">Vision</span>
      <h3 class="title">The Art of Minimalist <em>Efficiency</em></h3>
      <p class="excerpt">In a world of noise, clarity is the ultimate luxury. Our experts explore how structural simplicity leads to operational mastery in high-stakes environments...</p>
      <a href="#" class="link">Read Article &rarr;</a>
    </div>
    <div class="article">
      <span class="cat">Market</span>
      <h3 class="title">Precision in the Age of <em>Complexity</em></h3>
      <p class="excerpt">A deep dive into the evolving landscape of professional digital infrastructure and why SMIC360 Ltd remains the benchmark for security.</p>
      <a href="#" class="link">Read Article &rarr;</a>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'the-palm',
    title: 'The Palm 🌴',
    category: 'Real Estate',
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <title>The Palm 🌴 — Your Private Sanctuary in Accra is Waiting</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet">
  <style>
    /* ── RESET ─────────────────────────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; }
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #050505; }
    .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }

    /* ── OUTER WRAPPER ─────────────────────────────────────────── */
    .outer {
      background-color: #050505;
      background-image: url('https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_600/Adinkra-Symbols-and-Meaning_bnfhdd.png');
      background-repeat: repeat;
      background-size: 520px auto;
      background-attachment: fixed;
      padding: 40px 16px 60px;
    }

    /* ── EMAIL CARD ──────────────────────────────────────────────── */
    .card {
      width: 100%;
      max-width: 800px !important;
      margin: 0 auto;
      background-color: #0C0C0C;
      border: 1px solid rgba(201,150,58,0.18);
      overflow: hidden;
      box-shadow: 0 40px 120px rgba(0,0,0,0.9);
    }

    /* ── TOP TICKER ──────────────────────────────────────────────── */
    .ticker {
      background: linear-gradient(90deg, #C9963A 0%, #E8C06A 50%, #C9963A 100%);
      padding: 9px 32px;
      text-align: center;
    }
    .ticker p {
      margin: 0;
      font-family: Arial, sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: #080808;
    }

    /* ── HERO ────────────────────────────────────────────────────── */
    .hero-wrap { position: relative; overflow: hidden; }
    .hero-img  { width: 100%; max-height: 560px; object-fit: cover; display: block; }
    .hero-scrim {
      background: linear-gradient(180deg, rgba(8,8,8,0.05) 0%, rgba(8,8,8,1.00) 100%);
      padding: 40px 48px 52px;
      text-align: center;
    }

    .hero-h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 58px;
      font-weight: 300;
      line-height: 1.06;
      color: #F5F0E8;
      margin: 0 0 10px;
    }
    .hero-h1 em { font-style: italic; color: #C9963A; }

    .btn-gold {
      display: inline-block;
      background: linear-gradient(135deg, #C9963A 0%, #E8C06A 50%, #C9963A 100%);
      color: #080808;
      font-family: Arial, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      padding: 15px 44px;
      text-decoration: none;
    }

    /* ── SECTION ───────────────────────────────────────────────── */
    .sec { padding: 52px 48px; }
    .label {
      font-family: Arial, sans-serif;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: #C9963A;
      margin: 0 0 10px;
    }
    .h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 40px;
      font-weight: 300;
      line-height: 1.12;
      color: #F5F0E8;
      margin: 0 0 18px;
    }
    .body {
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.82;
      color: #888888;
      margin: 0 0 16px;
    }
    .footer { background: #080808; padding: 44px 48px; text-align: center; border-top: 1px solid rgba(201,150,58,0.12); }
  </style>
</head>
<body>
  <table width="100%" border="0" cellpadding="0" cellspacing="0" class="outer">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="card">
          <tr>
            <td>
              <div class="ticker"><p>Milehigh5280 ✦ Ayi Mensah, Accra ✦ Est. 2021</p></div>
              <div class="hero-wrap">
                <img class="hero-img" src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_800/ERR_jjr2hx.jpg" alt="Hero">
                <div class="hero-scrim">
                  <h1 class="hero-h1">There is a place in Accra where the world <em>slows down</em></h1>
                  <a href="#" class="btn-gold">Reserve Your Stay</a>
                </div>
              </div>
              <div class="sec">
                <p class="label">The Apartment</p>
                <h2 class="h2">Milehigh5280 <em>🌴</em></h2>
                <p class="body">Every room designed for rest. Every detail chosen for comfort. Nestled inside the quiet green hills of Ayi Mensah.</p>
                <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_800/5_yc05lt.jpg" alt="Living Room" style="width:100%; border:1px solid rgba(201,150,58,0.12);">
              </div>
              <div class="footer">
                <img src="${LOGO_URL}" width="40" height="40" style="border-radius:6%; margin-bottom:10px; border:1px solid rgba(201,150,58,0.2);">
                <p style="color:#C9963A; font-family:serif; font-size:24px; margin:0;">SMIC360 🌴</p>
                <p style="color:#555; font-size:10px; letter-spacing:0.3em; text-transform:uppercase; margin:5px 0 0;">Excellence &bull; Accra &bull; Global</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }
];
