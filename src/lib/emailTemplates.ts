// src/lib/emailTemplates.ts
// Force cache refresh

const baseStyles = `
    body {
      margin: 0;
      padding: 0;
      background-color: #FFF8F5; /* Matches the soft pinkish off-white background */
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
      color: #1A1A3A;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #FFFFFF;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }
    .text-center {
      text-align: center;
    }
    .icon-container {
      width: 64px;
      height: 64px;
      background-color: #ECFDF5;
      border-radius: 50%;
      margin: 0 auto 24px auto;
      text-align: center;
      line-height: 64px;
      font-size: 28px;
      color: #059669;
      font-weight: 900;
    }
    .status-text {
      color: #FF3366;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .title {
      color: #1A1A3A;
      font-size: 32px;
      font-weight: 900;
      margin: 0 0 16px 0;
      text-transform: uppercase;
      letter-spacing: -0.5px;
    }
    .subtitle {
      color: #6B7280;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 40px;
      font-weight: 600;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
    }
    .info-block {
      background-color: #F9FAFB;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .info-row {
      display: block;
      width: 100%;
      text-align: left;
      font-size: 0;
    }
    .info-col {
      display: inline-block;
      vertical-align: top;
      width: 32%;
      min-width: 120px;
      font-size: 14px;
      box-sizing: border-box;
      padding-right: 16px;
      margin-bottom: 16px;
    }
    .label {
      color: #9CA3AF;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }
    .value {
      font-size: 15px;
      font-weight: 800;
      color: #111827;
    }
    .value.pink { color: #FF3366; }
    .value.green { color: #059669; }
    
    .delivery-block {
      background-color: #F0FDF4;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      border: 1px solid #DCFCE7;
    }
    .delivery-title {
      color: #047857;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
    .delivery-text {
      color: #374151;
      font-size: 13px;
      line-height: 1.6;
      margin: 0;
      font-weight: 600;
    }
    
    .interac-block {
      background-color: #FFF5F8;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .interac-title {
      color: #FF3366;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .interac-text {
      color: #6B7280;
      font-size: 13px;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .interac-details {
      background-color: #FFFFFF;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #F3E8EC;
    }
    .action-link {
      color: #FF3366;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      text-decoration: none;
      margin-top: 6px;
      display: inline-block;
      letter-spacing: 0.5px;
    }
    .footer-note {
      color: #FF3366;
      font-size: 11px;
      font-weight: 700;
      margin-top: 16px;
    }

    .account-block {
      background-color: #F0F5FF;
      border-radius: 16px;
      padding: 20px 24px;
      border: 1px solid #E0E7FF;
      display: table;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 24px;
    }
    .account-icon-cell {
      display: table-cell;
      width: 44px;
      vertical-align: middle;
    }
    .account-icon {
      width: 40px;
      height: 40px;
      background-color: #DBEAFE;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      color: #2563EB;
    }
    .account-content-cell {
      display: table-cell;
      vertical-align: middle;
      padding-left: 16px;
    }
    .account-title {
      color: #1E3A8A;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      margin: 0 0 4px 0;
    }
    .account-text {
      color: #4B5563;
      font-size: 13px;
      margin: 0;
      font-weight: 600;
    }
    .account-link {
      color: #FF3366;
      text-decoration: none;
      font-weight: 700;
    }

    @media only screen and (max-width: 600px) {
      .container {
        padding: 24px !important;
        margin: 20px auto !important;
      }
      .title {
        font-size: 24px !important;
      }
      .info-row {
        display: block !important;
      }
      .info-col {
        display: block !important;
        width: 100% !important;
        margin-bottom: 20px !important;
        box-sizing: border-box;
      }
      .info-col:last-child {
        margin-bottom: 0 !important;
      }
    }
`;

export const generateCustomerEmailHtml = (orderDetails: any, customerEmail: string) => {
  const {
    orderId = '#FG-33422',
    grandTotal = '$59.20',
    subtotal = '$74.00',
    discountAmount = '-$14.80',
    deliveryDetails = {},
    trackingNumber = 'CX307775569CA',
    date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    items = []
  } = orderDetails;

  const deliveryDate = deliveryDetails?.date || 'June 25, 2026';
  const deliveryTime = deliveryDetails?.timeSlot || '9:00 AM to 12:00 PM';

  const itemsHtml = items.length > 0 ? items.map((item: any) => `
    <tr>
      <td style="padding: 6px 0; border-bottom: 1px dashed #E5E7EB; color: #374151;">${item.quantity} &times; ${item.title || item.name}</td>
      <td style="padding: 6px 0; text-align: right; border-bottom: 1px dashed #E5E7EB; color: #374151;"><strong>${typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}</strong></td>
    </tr>
  `).join('') : `
    <tr><td colspan="2" style="padding: 6px 0; color: #6B7280;">No items found</td></tr>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    ${baseStyles}
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF8F5; font-family: Helvetica, Arial, sans-serif;">
  <div style="padding: 40px 20px; background-color: #FFF8F5; width: 100%; box-sizing: border-box;">
    <div class="container">
      
      <div class="text-center">
        <div class="icon-container">&#10004;&#xFE0E;</div>
        <div class="status-text">RESERVATION CONFIRMED</div>
        <h1 class="title">YOUR DELIVERY SLOT IS SECURED</h1>
        <p class="subtitle">Thank you for placing your order. Your products have been successfully reserved and scheduled for delivery during our upcoming launch.</p>
      </div>

      <div class="info-block">
        <div class="info-row">
          <div class="info-col">
            <div class="label">ORDER ID</div>
            <div class="value">${orderId}</div>
          </div>
          <div class="info-col">
            <div class="label">DATE PLACED</div>
            <div class="value">${date}</div>
          </div>
          <div class="info-col">
            <div class="label">TRACKING NUMBER</div>
            <div class="value green">${trackingNumber}</div>
          </div>
        </div>
      </div>

      <div class="info-block" style="background-color: #FFFFFF; border: 1px solid #F3F4F6;">
        <div class="delivery-title" style="color: #111827;">
          &#128230; ORDER SUMMARY
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; margin-bottom: 8px;">
          ${itemsHtml}
          <tr>
            <td style="padding: 12px 0 4px 0; color: #6B7280; font-weight: 600;">Subtotal</td>
            <td style="padding: 12px 0 4px 0; text-align: right; color: #111827;"><strong>${subtotal}</strong></td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #6B7280; font-weight: 600;">Early Access Discount (20%)</td>
            <td style="padding: 4px 0; text-align: right; color: #FF3366;"><strong>${discountAmount}</strong></td>
          </tr>
          <tr>
            <td style="padding: 16px 0 4px 0; font-size: 16px; font-weight: 800; color: #111827;">GRAND TOTAL</td>
            <td style="padding: 16px 0 4px 0; text-align: right; font-size: 16px; font-weight: 800; color: #FF3366;">${grandTotal}</td>
          </tr>
        </table>
      </div>

      <div class="delivery-block">
        <div class="delivery-title">
          &#128666; PRIORITY PRE-LAUNCH DELIVERY
        </div>
        <p class="delivery-text">
          Your order has been reserved for our official delivery launch on:
        </p>
        <p class="delivery-text" style="font-size: 16px; margin-top: 8px;">
          <strong style="color: #047857;">${deliveryDate}</strong><br>
          <span style="font-size: 14px;">Delivery Window: <strong>${deliveryTime}</strong></span>
        </p>
      </div>

      <div class="interac-block" style="background-color: #FEF3C7; border: 1px solid #FDE68A;">
        <div class="interac-title" style="color: #D97706;">
          &#127881; EARLY ACCESS SAVINGS
        </div>
        <p class="interac-text" style="color: #92400E; margin-bottom: 0;">
          You received an exclusive 20% pre-launch discount for reserving your order before our official launch date.<br><br>
          <strong>Total Saved: ${discountAmount.replace('-', '')}</strong>
        </p>
      </div>

      <div class="interac-block" style="background-color: #F3F4F6; border: 1px solid #E5E7EB;">
        <div class="interac-title" style="color: #374151;">
          &#128179; PAYMENT INFORMATION
        </div>
        <p class="interac-text" style="color: #4B5563; margin-bottom: 0;">
          <strong>No payment is required at this time.</strong><br><br>
          Once our team reviews and confirms your order, we will contact you by SMS and/or email with Interac e-Transfer instructions. Payment will only be requested after your order has been verified and approved for fulfillment.
        </p>
      </div>

      <div class="interac-block" style="background-color: #EFF6FF; border: 1px solid #BFDBFE;">
        <div class="interac-title" style="color: #1D4ED8;">
          &#128242; DELIVERY UPDATES
        </div>
        <p class="interac-text" style="color: #1E3A8A; margin-bottom: 0;">
          We'll send SMS and/or email updates before delivery, including order confirmation, payment instructions, delivery reminders, and your estimated arrival time (ETA), so you know exactly when to expect your order.<br><br>
          Your products have been secured and added to our priority fulfillment queue. We appreciate your early support and look forward to serving you on launch day.
        </p>
      </div>

    </div>
  </div>
</body>
</html>
  `;
};

export const generateAdminEmailHtml = (orderDetails: any, customerEmail: string) => {
  const {
    orderId = '#FG-17247',
    grandTotal = '$86.00',
    deliveryDetails = {},
    date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    trackingNumber = 'CX307775569CA',
  } = orderDetails;

  const deliveryDate = deliveryDetails?.date || 'June 25, 2026';
  const deliveryTime = deliveryDetails?.timeSlot || '3:00 PM to 6:00 PM';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Received</title>
  <style>
    ${baseStyles}
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF8F5; font-family: 'Poppins', Helvetica, Arial, sans-serif;">
  <div style="padding: 40px 20px; background-color: #FFF8F5; width: 100%; box-sizing: border-box;">
    <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
      <div class="text-center">
        <div class="icon-container">&#10004;&#xFE0E;</div>
        
        <div class="status-text">ACTION REQUIRED</div>
        <h1 class="title">NEW ORDER RECEIVED</h1>
        <p class="subtitle">A new order has been placed by <strong>${customerEmail}</strong>. Please review the details and prepare it for delivery.</p>
      </div>

      <div class="info-block">
        <div class="info-row">
          <div class="info-col">
            <div class="label">ORDER ID</div>
            <div class="value">${orderId}</div>
          </div>
          <div class="info-col">
            <div class="label">DATE</div>
            <div class="value">${date}</div>
          </div>
          <div class="info-col">
            <div class="label">TOTAL AMOUNT</div>
            <div class="value pink">${grandTotal}</div>
          </div>
          <div class="info-col">
            <div class="label">CANADA POST</div>
            <div class="value green">${trackingNumber}</div>
          </div>
        </div>
      </div>

      <div class="delivery-block">
        <div class="delivery-title">
          <span style="margin-right: 8px; font-size: 14px;">&#128666;</span> REQUESTED PRE-LAUNCH DELIVERY
        </div>
        <p class="delivery-text">
          Delivery has been scheduled for <strong>${deliveryDate}</strong> during the <strong>${deliveryTime}</strong> delivery window. 
        </p>
      </div>

    </div>
  </div>
</body>
</html>
  `;
};

export const generateRegistrationEmailTemplate = (name: string, tempPassword?: string) => {
  const firstName = name.split(' ')[0] || 'there';

  let passwordHtml = '';
  if (tempPassword) {
    passwordHtml = `
      <div class="info-block" style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; margin-top: 20px;">
        <p style="font-size: 15px; font-weight: 800; color: #92400E; margin-top: 0; margin-bottom: 8px;">Your Temporary Password</p>
        <p style="color: #B45309; font-size: 14px; margin: 0 0 12px 0;">An account has been automatically created for you. You can use the password below to log in.</p>
        <div style="background-color: #FFFFFF; border: 1px dashed #FDE68A; padding: 12px; text-align: center; border-radius: 8px; font-size: 18px; font-weight: 900; letter-spacing: 2px; color: #111827;">
          ${tempPassword}
        </div>
        <p style="color: #92400E; font-size: 12px; margin: 12px 0 0 0; font-weight: 600;">*Please change this password in your Account Settings after logging in.</p>
      </div>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>${baseStyles}</style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #FFF8F5; font-family: 'Poppins', Helvetica, Arial, sans-serif;">
        <div style="padding: 40px 20px; background-color: #FFF8F5; width: 100%; box-sizing: border-box;">
          <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
            <div class="text-center">
              <div class="icon-container" style="color: #FF3366; background-color: #FFF0F5;">🚀</div>
            <div class="status-text">You're officially on the list</div>
            <h1 class="title">Hello ${firstName},</h1>
            <p class="subtitle">Thank you for signing up for launch notifications.</p>
          </div>

          <div class="info-block" style="background-color: #F9FAFB; border-left: 4px solid #FF3366;">
            <p style="font-size: 15px; font-weight: 800; color: #111827; margin-top: 0;">As one of our early subscribers, you'll receive:</p>
            <ul style="list-style-type: none; padding-left: 0; margin-bottom: 0;">
              <li style="margin-bottom: 10px; color: #4B5563; font-size: 14px; font-weight: 600;"><span style="color: #059669; font-weight: 900; margin-right: 8px;">✓</span> Early access to shop</li>
              <li style="margin-bottom: 10px; color: #4B5563; font-size: 14px; font-weight: 600;"><span style="color: #059669; font-weight: 900; margin-right: 8px;">✓</span> Launch-day promotions</li>
              <li style="margin-bottom: 10px; color: #4B5563; font-size: 14px; font-weight: 600;"><span style="color: #059669; font-weight: 900; margin-right: 8px;">✓</span> Exclusive discounts</li>
              <li style="margin-bottom: 10px; color: #4B5563; font-size: 14px; font-weight: 600;"><span style="color: #059669; font-weight: 900; margin-right: 8px;">✓</span> Delivery and shipping updates</li>
              <li style="color: #4B5563; font-size: 14px; font-weight: 600;"><span style="color: #059669; font-weight: 900; margin-right: 8px;">✓</span> SMS and email notifications</li>
            </ul>
          </div>
          
          ${passwordHtml}

          <p style="color: #6B7280; font-size: 14px; line-height: 1.6; font-weight: 600; text-align: center;">
            We'll contact you as soon as we're ready to open, along with any special offers available to early supporters.
          </p>

          <p style="color: #6B7280; font-size: 14px; line-height: 1.6; font-weight: 600; text-align: center;">
            Thank you for joining us. We look forward to serving you soon.
          </p>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 12px; font-weight: 600;">
            <div style="margin-bottom: 8px; font-weight: 800; letter-spacing: 0.5px;">The Delivery & Shipping Team</div>
            <div>funguyz.ca</div>
            <p style="margin-top: 16px;">Please do not reply to this email.</p>
          </div>
          </div>
        </div>
      </body>
    </html>
  `;

  let passwordText = '';
  if (tempPassword) {
    passwordText = `\nYour Temporary Password: ${tempPassword}\n(Please change this password in your Account Settings after logging in.)\n`;
  }

  const text = `Hello ${firstName},

You're officially on the list.

Thank you for signing up for launch notifications.
${passwordText}
As one of our early subscribers, you'll receive:

✓ Early access to shop
✓ Launch-day promotions
✓ Exclusive discounts
✓ Delivery and shipping updates
✓ SMS and email notifications

We'll contact you as soon as we're ready to open, along with any special offers available to early supporters.

Thank you for joining us. We look forward to serving you soon.

The Delivery & Shipping Team
`;

  return { html, text };
};

export const generateContactEmailTemplate = (formData: any) => {
  const { name, email, phone, category, subject, message } = formData;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Support Ticket</title>
  <style>
    ${baseStyles}
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF8F5; font-family: 'Poppins', Helvetica, Arial, sans-serif;">
  <div style="padding: 40px 20px; background-color: #FFF8F5; width: 100%; box-sizing: border-box;">
    <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
      <div class="text-center">
        <div class="icon-container" style="color: #2563EB; background-color: #DBEAFE;">💬</div>
        
        <div class="status-text" style="color: #2563EB;">NEW SUPPORT TICKET</div>
        <h1 class="title">CUSTOMER INQUIRY</h1>
        <p class="subtitle">A new support request has been submitted by <strong>${name}</strong>.</p>
      </div>

      <div class="info-block">
        <div class="info-row">
          <div class="info-col">
            <div class="label">CUSTOMER NAME</div>
            <div class="value">${name}</div>
          </div>
          <div class="info-col">
            <div class="label">EMAIL ADDRESS</div>
            <div class="value pink"><a href="mailto:${email}" style="color: #FF3366; text-decoration: none;">${email}</a></div>
          </div>
          <div class="info-col">
            <div class="label">PHONE</div>
            <div class="value">${phone || 'N/A'}</div>
          </div>
        </div>
      </div>

      <div class="delivery-block" style="background-color: #F8FAFC; border: 1px solid #E2E8F0;">
        <div class="delivery-title" style="color: #475569;">
          <span style="margin-right: 8px; font-size: 14px;">🏷️</span> CATEGORY: ${category}
        </div>
        <div class="delivery-title" style="color: #0F172A; margin-top: 12px; font-size: 14px;">
          SUBJECT: ${subject || 'No Subject'}
        </div>
        <p class="delivery-text" style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #E2E8F0; white-space: pre-wrap;">
${message}
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 12px; font-weight: 600;">
        <div style="margin-bottom: 8px; font-weight: 800; letter-spacing: 0.5px;">FunGuyz Support System</div>
        <div>Please reply directly to the customer's email address to respond.</div>
      </div>

    </div>
  </div>
</body>
</html>
  `;

  return { html };
};
