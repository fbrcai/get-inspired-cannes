import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

interface EmailPayload {
  to: string
  name: string
  imageUrl: string
  inspiration: string
  charityName: string | null
}

function buildEmailHtml(payload: EmailPayload): string {
  const greeting = payload.name ? `Hi ${payload.name},` : 'Hi there,'
  const charityLine = payload.charityName
    ? `You chose to stand with <strong>${payload.charityName}</strong> — that conviction is woven into every pixel of your image.`
    : `Your conviction is woven into every pixel of your image.`

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your GET INSPIRED image</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'DM Sans',Helvetica,Arial,sans-serif;color:#F5F0E8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="padding:0 0 32px;text-align:center;">
          <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C9A84C;">
            Cannes Lions 2026
          </p>
          <h1 style="margin:0;font-size:56px;font-weight:900;letter-spacing:0.04em;color:#F5F0E8;text-transform:uppercase;line-height:1;">
            GET INSPIRED
          </h1>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 0 32px;">
          <div style="height:0.5px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);"></div>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:0 0 24px;">
          <p style="margin:0 0 12px;font-size:16px;line-height:1.7;color:#F5F0E8;">${greeting}</p>
          <p style="margin:0;font-size:15px;line-height:1.7;color:rgba(245,240,232,0.65);">
            Your <strong style="color:#C9A84C;">${payload.inspiration}</strong>-inspired image from Cannes Lions 2026 is ready.
            ${charityLine}
          </p>
        </td></tr>

        <!-- Image -->
        <tr><td style="padding:0 0 32px;text-align:center;">
          <a href="${payload.imageUrl}" target="_blank" style="display:inline-block;">
            <img src="${payload.imageUrl}" alt="Your GET INSPIRED image"
              style="max-width:100%;border:0.5px solid rgba(201,168,76,0.3);display:block;" />
          </a>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:0 0 32px;text-align:center;">
          <a href="${payload.imageUrl}" download
            style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-size:13px;font-weight:600;
                   letter-spacing:0.12em;text-transform:uppercase;padding:16px 40px;text-decoration:none;">
            Download Your Image
          </a>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 0 24px;">
          <div style="height:0.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);"></div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="text-align:center;">
          <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(245,240,232,0.25);">
            GET INSPIRED · Cannes Lions 2026
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const payload: EmailPayload = await req.json()

    if (!payload.to || !payload.imageUrl) {
      return NextResponse.json({ error: 'to and imageUrl are required' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'GET INSPIRED <noreply@getinspired.live>',
      to: payload.to,
      subject: `Your GET INSPIRED image from Cannes Lions 2026`,
      html: buildEmailHtml(payload),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data?.id })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Email failed' },
      { status: 500 }
    )
  }
}
