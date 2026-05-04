export interface EmailTemplate {
  id: string;
  title: string;
  category: string;
  html: string;
}

export const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: 'welcome',
    title: 'Welcome Email',
    category: 'Onboarding',
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .header { background-color: #CCB94D; padding: 30px; text-align: center; color: #1F1C17; }
    .content { padding: 40px; color: #333333; line-height: 1.6; }
    .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999999; }
    .button { display: inline-block; padding: 12px 24px; background-color: #1F1C17; color: #CCB94D; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to SMIC360</h1>
    </div>
    <div class="content">
      <h2>Hello there!</h2>
      <p>We're thrilled to have you join our premium platform. You're now part of an exclusive group dedicated to excellence in communication.</p>
      <p>Explore your dashboard to see what we've prepared for you.</p>
      <a href="#" class="button">Get Started</a>
    </div>
    <div class="footer">
      &copy; 2024 SMIC360 Ltd. All rights reserved.
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
  <style>
    body { font-family: sans-serif; margin: 0; padding: 0; background: #fafafa; }
    .card { max-width: 550px; margin: 20px auto; background: white; border: 1px solid #eee; }
    .img-placeholder { background: #eee; height: 200px; display: flex; align-items: center; justify-content: center; color: #888; }
    .body-text { padding: 30px; }
    .tag { background: #E87E46; color: white; padding: 4px 8px; border-radius: 3px; font-size: 12px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <div class="img-placeholder">SMIC360 Product Update</div>
    <div class="body-text">
      <span class="tag">NEW UPDATE</span>
      <h1 style="margin-top: 15px;">Version 2.0 is Here!</h1>
      <p>We've completely redesigned the interface to bring you a more fluid and intuitive experience. Check out the new dark mode features and enhanced collaboration tools.</p>
      <p>Our team has worked tirelessly to improve performance across the board.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 14px; color: #666;">View the full release notes on our blog.</p>
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
  <style>
    .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; font-size: 16px; line-height: 24px; font-family: 'Helvetica', 'Arial', sans-serif; color: #555; }
    .invoice-box table { width: 100%; line-height: inherit; text-align: left; }
    .invoice-box table td { padding: 5px; vertical-align: top; }
    .invoice-box table tr.top table td { padding-bottom: 20px; }
    .invoice-box table tr.heading td { background: #eee; border-bottom: 1px solid #ddd; font-weight: bold; }
    .invoice-box table tr.item td { border-bottom: 1px solid #eee; }
    .invoice-box table tr.total td:nth-child(2) { border-top: 2px solid #eee; font-weight: bold; }
  </style>
</head>
<body>
  <div class="invoice-box">
    <table cellpadding="0" cellspacing="0">
      <tr class="top">
        <td colspan="2">
          <table>
            <tr>
              <td class="title" style="font-size: 35px; color: #1F1C17; font-weight: bold;">SMIC360</td>
              <td style="text-align: right;">Invoice #: 123<br>Created: May 20, 2024</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr class="heading">
        <td>Item</td>
        <td>Price</td>
      </tr>
      <tr class="item">
        <td>Premium Monthly Subscription</td>
        <td>$49.00</td>
      </tr>
      <tr class="total">
        <td></td>
        <td>Total: $49.00</td>
      </tr>
    </table>
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
<body style="background: #f0f0f0; padding: 50px; font-family: Arial, sans-serif;">
  <div style="background: #fff; padding: 30px; max-width: 400px; margin: auto; border-radius: 10px; text-align: center;">
    <h2 style="color: #333;">Reset Your Password</h2>
    <p style="color: #666;">We received a request to reset your password. If you didn't make this request, just ignore this email.</p>
    <a href="#" style="background: #E87E46; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Reset Password</a>
    <p style="font-size: 12px; color: #aaa; margin-top: 30px;">Button not working? Copy this link: https://smic360.app/reset/token123</p>
  </div>
</body>
</html>`
  },
  {
    id: 'newsletter',
    title: 'Weekly Newsletter',
    category: 'Marketing',
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    .news-card { border: 1px solid #ddd; padding: 20px; font-family: Georgia, serif; }
    .header { font-size: 32px; border-bottom: 3px double #333; padding-bottom: 10px; text-align: center; }
    .article { margin: 20px 0; }
    .article-title { font-weight: bold; font-size: 20px; }
  </style>
</head>
<body>
  <div class="news-card">
    <div class="header">SMIC360 INSIGHTS</div>
    <div class="article">
      <div class="article-title">Why Minimalist Design is the Future</div>
      <p>Experts suggest that reducing visual clutter is key to increasing user engagement in 2024...</p>
    </div>
    <div class="article">
      <div class="article-title">The Art of the Email Subject Line</div>
      <p>How a few words can determine the success of your entire campaign...</p>
    </div>
  </div>
</body>
</html>`
  }
];
