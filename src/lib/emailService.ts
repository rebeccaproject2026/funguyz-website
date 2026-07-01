import { Resend } from 'resend';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
}

// Utility to generate plain text from HTML to help avoid spam filters
function generatePlainTextFromHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove style tags and content
    .replace(/<br\s*[\/]?>/gi, '\n')                // Replace <br> with newline
    .replace(/<\/p>|<\/div>|<\/li>|<\/h[1-6]>/gi, '\n\n') // Replace closing block tags with double newline
    .replace(/<[^>]+>/g, '')                        // Remove all other HTML tags
    .replace(/&nbsp;/gi, ' ')                       // Replace common HTML entities
    .replace(/&times;/gi, 'x')
    .replace(/&#[0-9a-zA-Z]+;/gi, '')               // Remove numeric html entities
    .replace(/&[a-zA-Z]+;/gi, '')                   // Remove string html entities
    .replace(/\n\s+\n/g, '\n\n')                    // Clean up blank lines with spaces
    .replace(/\n{3,}/g, '\n\n')                     // Reduce multiple blank lines to two
    .trim();
}

export async function sendEmail({ to, subject, html, text, replyTo, from }: SendEmailOptions) {
  // Toggle: Set to 'RESEND' or 'MICROSOFT' based on env. Defaulting to RESEND for now.
  const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'RESEND'; 
  const senderEmail = from || process.env.MS_SENDER_EMAIL || process.env.SMTP_USER || 'hello@funguyzdelivery.ca';
  const senderName = 'FunGuyz Store';

  const plainText = text || generatePlainTextFromHtml(html);

  if (EMAIL_PROVIDER === 'RESEND') {
    return sendViaResend({ to, subject, html, text: plainText, replyTo, senderEmail, senderName, from });
  } else if (EMAIL_PROVIDER === 'MICROSOFT') {
    return sendViaMicrosoftGraph({ to, subject, html, text: plainText, replyTo, senderEmail });
  } else {
    throw new Error(`Invalid EMAIL_PROVIDER: ${EMAIL_PROVIDER}`);
  }
}

async function sendViaResend({ to, subject, html, text, replyTo, senderEmail, senderName, from }: any) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error('RESEND_API_KEY missing. Skipping Resend email.');
    return;
  }
  
  const resend = new Resend(resendKey);
  console.log(`[Resend] Sending email to ${to}...`);
  
  // If 'from' is passed directly (e.g. from contact route), use it. Otherwise, build it.
  const fromField = from || `${senderName} <${senderEmail}>`;
  
  try {
    const data = await resend.emails.send({
      from: fromField,
      to,
      subject,
      html,
      text, // Adding plain text version to drastically reduce spam score
      replyTo: replyTo,
    });
    console.log('[Resend] Success:', data);
    return data;
  } catch (error) {
    console.error('[Resend] Error:', error);
    throw error;
  }
}

async function sendViaMicrosoftGraph({ to, subject, html, text, replyTo, senderEmail }: any) {
  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    console.error('[Microsoft Graph] Credentials missing. Skipping email.');
    return;
  }

  try {
    console.log('[Microsoft Graph] Requesting OAuth token...');
    const tokenResponse = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        scope: 'https://graph.microsoft.com/.default',
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      console.error('[Microsoft Graph] Token fetch failed:', JSON.stringify(tokenData));
      throw new Error('Failed to get Microsoft Graph API token.');
    }

    console.log(`[Microsoft Graph] Sending email to ${to}...`);
    
    // Format recipients
    const toEmails = Array.isArray(to) ? to : [to];
    const toRecipients = toEmails.map(emailAddress => ({ emailAddress: { address: emailAddress } }));

    const messagePayload: any = {
      message: {
        subject: subject,
        body: {
          contentType: 'HTML',
          content: html
        },
        toRecipients: toRecipients
      },
      saveToSentItems: true
    };

    if (replyTo) {
      messagePayload.message.replyTo = [{ emailAddress: { address: replyTo } }];
    }

    const res = await fetch(`https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messagePayload)
    });

    if (res.ok) {
       console.log(`[Microsoft Graph] Email successfully delivered to ${to}!`);
    } else {
       const errText = await res.text();
       console.error(`[Microsoft Graph] Error sending to ${to}:`, res.status, errText);
       throw new Error(`Graph API Error: ${errText}`);
    }
  } catch (err) {
    console.error('[Microsoft Graph] Exception:', err);
    throw err;
  }
}
