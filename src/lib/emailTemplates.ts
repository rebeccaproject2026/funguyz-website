// src/lib/emailTemplates.ts

const baseStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');
    
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
      display: table;
      width: 100%;
    }
    .info-col {
      display: table-cell;
      width: 25%;
      vertical-align: top;
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
`;

export const generateCustomerEmailHtml = (orderDetails: any, customerEmail: string) => {
  const {
    orderId = '#FG-17247',
    grandTotal = '$86.00',
    deliveryDetails = {},
    trackingNumber = 'CX307775569CA',
    contactPhone = '+918585885858',
    contactEmail = 'tinysocio@gmail.com',
    date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    interacEmail = 'funguys.rock@gmail.com',
    interacQuestion = 'Canada7247',
  } = orderDetails;

  const deliveryDate = deliveryDetails?.date || 'June 25, 2026';
  const deliveryTime = deliveryDetails?.timeSlot || '3:00 PM to 6:00 PM';

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
<body style="margin: 0; padding: 0; background-color: #FFF8F5; font-family: 'Poppins', Helvetica, Arial, sans-serif;">
  <div style="padding: 40px 20px; background-color: #FFF8F5; width: 100%; box-sizing: border-box;">
    <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
      <div class="text-center">
        <div class="icon-container">&#10004;&#xFE0E;</div>
        
        <div class="status-text">ORDER PLACED SUCCESSFULLY!</div>
        <h1 class="title">THANK YOU FOR YOUR ORDER</h1>
        <p class="subtitle">Your discreet package is currently being processed. You will receive an email confirmation containing your invoices and shipping details.</p>
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
          <span style="margin-right: 8px; font-size: 14px;">&#128666;</span> SCHEDULED PRE-LAUNCH DELIVERY
        </div>
        <p class="delivery-text">
          Your delivery has been scheduled for <strong>${deliveryDate}</strong> during the <strong>${deliveryTime}</strong> delivery window. We will contact you at <strong>${contactPhone}</strong> or <strong>${contactEmail}</strong> to coordinate.
        </p>
      </div>

      <div class="interac-block">
        <div class="interac-title">
          <span style="margin-right: 8px; font-size: 14px;">&#10024;</span> INTERAC E-TRANSFER INSTRUCTIONS
        </div>
        <p class="interac-text">Once payment is sent, your order will be processed and prepared for delivery.</p>
        <div class="interac-details">
          <div class="info-row">
            <div class="info-col" style="width: 42%;">
              <div class="label">RECIPIENT EMAIL</div>
              <div class="value">${interacEmail}</div>
              <a href="#" class="action-link">COPY EMAIL</a>
            </div>
            <div class="info-col" style="width: 38%;">
              <div class="label">QUESTION / PASSWORD</div>
              <div class="value">${interacQuestion}</div>
              <a href="#" class="action-link">COPY PASSWORD</a>
            </div>
            <div class="info-col" style="width: 20%;">
              <div class="label">AMOUNT DUE</div>
              <div class="value pink" style="font-size: 16px;">${grandTotal}</div>
              <div class="label" style="margin-top: 6px;">CAD DOLLARS</div>
            </div>
          </div>
        </div>
        <div class="footer-note">
          * Note: Fast &bull; Secure &bull; Discreet Delivery Across Canada &#127464;&#127462;
        </div>
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
