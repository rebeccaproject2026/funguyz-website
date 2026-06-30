export async function verifyTurnstileToken(token: string | null): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // In development, bypass Turnstile if the widget didn't produce a token
  if (!token) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Turnstile] No token in dev mode — bypassing verification.');
      return true;
    }
    return false;
  }

  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY is missing. Passing validation automatically (dev mode).');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('[Turnstile] Cloudflare response:', JSON.stringify(data));
    return data.success;
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return false;
  }
}
