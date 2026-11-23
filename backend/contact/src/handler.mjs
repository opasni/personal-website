import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const ses = new SESv2Client({});
const reply = (statusCode, body) => ({
    statusCode,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    body: JSON.stringify(body),
});
const clean = (value) => (typeof value === 'string' ? value.trim() : '');

async function verifyTurnstile(token, sourceIp) {
    const params = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token });
    if (sourceIp) params.set('remoteip', sourceIp);
    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: params,
        signal: AbortSignal.timeout(5000),
    });
    if (!result.ok) return false;
    const verification = await result.json();
    return (
        verification.success === true &&
        verification.hostname === new URL(process.env.ALLOWED_ORIGIN).hostname &&
        verification.action === 'contact'
    );
}

export const handler = async (event) => {
    let data;
    try {
        const rawBody = event.isBase64Encoded
            ? Buffer.from(event.body || '', 'base64').toString('utf8')
            : event.body || '{}';
        if (Buffer.byteLength(rawBody, 'utf8') > 12000) return reply(413, { message: 'Message too large.' });
        data = JSON.parse(rawBody);
        if (!data || typeof data !== 'object' || Array.isArray(data))
            return reply(400, { message: 'Invalid request.' });
    } catch {
        return reply(400, { message: 'Invalid request.' });
    }

    const name = clean(data.name);
    const email = clean(data.email);
    const message = clean(data.message);
    const token = clean(data.turnstileToken);
    if (clean(data.website)) return reply(202, { message: 'Thank you.' });
    if (!name || name.length > 120 || !email || email.length > 254 || !message || message.length > 4000 || !token) {
        return reply(400, { message: 'Please check the fields and try again.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return reply(400, { message: 'Please enter a valid email address.' });
    }

    try {
        if (!(await verifyTurnstile(token, event.requestContext?.http?.sourceIp))) {
            return reply(400, { message: 'Spam check failed. Please try again.' });
        }
        await ses.send(
            new SendEmailCommand({
                FromEmailAddress: process.env.SES_FROM_EMAIL,
                Destination: { ToAddresses: [process.env.CONTACT_TO_EMAIL] },
                ReplyToAddresses: [email],
                Content: {
                    Simple: {
                        Subject: { Data: 'New website enquiry', Charset: 'UTF-8' },
                        Body: {
                            Text: {
                                Data: 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message,
                                Charset: 'UTF-8',
                            },
                        },
                    },
                },
            }),
        );
        return reply(200, { message: 'Message sent.' });
    } catch (error) {
        console.error('Contact form delivery failed', { name: error?.name || 'Error' });
        return reply(503, { message: 'Message could not be sent. Please try again later.' });
    }
};
