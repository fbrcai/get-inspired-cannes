import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase'
import { buildPrompt } from '@/lib/prompt-builder'
import type { GeneratePayload } from '@/lib/types'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

// ── PHOTO UPLOAD ──────────────────────────────────────────────────────────────
async function uploadPhotoToSupabase(photoBase64: string): Promise<string | null> {
  try {
    const db = supabaseAdmin()
    const buffer = Buffer.from(photoBase64, 'base64')
    const filename = `photos/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
    const { error } = await db.storage
      .from('photos')
      .upload(filename, buffer, { contentType: 'image/jpeg', upsert: false })
    if (error) { console.error('Photo upload error:', error); return null }
    const { data } = db.storage.from('photos').getPublicUrl(filename)
    return data.publicUrl
  } catch (e) {
    console.error('Photo upload failed:', e)
    return null
  }
}

// ── MIRROR FAL IMAGE TO SUPABASE ──────────────────────────────────────────────
// fal.ai CDN URLs expire — download and re-host permanently in Supabase
async function mirrorImageToSupabase(falUrl: string): Promise<string> {
  const res = await fetch(falUrl)
  if (!res.ok) throw new Error(`Failed to download fal image: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const ext = contentType.includes('png') ? 'png' : 'jpg'
  const filename = `generated/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const db = supabaseAdmin()
  const { error } = await db.storage
    .from('photos')
    .upload(filename, buffer, { contentType, upsert: false })
  if (error) {
    console.error('Mirror upload failed — using fal URL as fallback:', error)
    return falUrl
  }
  const { data } = db.storage.from('photos').getPublicUrl(filename)
  return data.publicUrl
}

// ── FLUX.2 [PRO] GENERATION ───────────────────────────────────────────────────
async function generateWithFlux2Pro(prompt: string, photoUrl: string | null): Promise<string> {
  const apiKey = process.env.FAL_API_KEY
  if (!apiKey) throw new Error('FAL_API_KEY not set')

  // Correct endpoint IDs per fal.ai docs
  const endpoint = photoUrl
    ? 'https://fal.run/fal-ai/flux-2-pro/edit'   // image-to-image editing
    : 'https://fal.run/fal-ai/flux-2-pro'         // text-to-image

  const body: Record<string, unknown> = {
    prompt,
    image_size: 'portrait_4_3',
    num_images: 1,
    output_format: 'jpeg',
  }

  if (photoUrl) {
    body.image_urls = [photoUrl]  // flux-2-pro/edit expects an array
  }

  console.log('\n── FLUX.2 [pro] REQUEST ──')
  console.log('Endpoint:', endpoint)
  console.log('Has photo:', !!photoUrl)
  console.log('Prompt:\n', prompt)
  console.log('──────────────────────────\n')

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Key ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`fal.ai error ${res.status}: ${err}`)
  }

  const data = await res.json()
  console.log('fal.ai raw response:', JSON.stringify(data).slice(0, 300))

  const imageUrl = data?.images?.[0]?.url || data?.image?.url || data?.url
  if (!imageUrl) throw new Error('No image URL in response: ' + JSON.stringify(data).slice(0, 300))

  return imageUrl
}

// ── EMAIL ─────────────────────────────────────────────────────────────────────
async function sendEmail(
  to: string, name: string, imageUrl: string,
  inspiration: string, charityName: string | null
): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) { console.error('RESEND_API_KEY not set'); return }

  const resend = new Resend(resendKey)
  const greeting = name ? `Hi ${name},` : 'Hi there,'
  const charityLine = charityName
    ? `You chose to stand with <strong>${charityName}</strong> — that conviction is woven into every pixel.`
    : 'Your conviction is woven into every pixel of your image.'
  const inspirationLabel = inspiration.charAt(0).toUpperCase() + inspiration.slice(1)

  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:Helvetica,Arial,sans-serif;color:#F5F0E8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding:0 0 24px;text-align:center;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C9A84C;">Cannes Lions 2026</p>
          <h1 style="margin:0;font-size:48px;font-weight:900;letter-spacing:0.04em;color:#F5F0E8;text-transform:uppercase;line-height:1;">GET INSPIRED</h1>
        </td></tr>
        <tr><td style="padding:0 0 24px;">
          <p style="margin:0 0 10px;font-size:16px;line-height:1.7;color:#F5F0E8;">${greeting}</p>
          <p style="margin:0;font-size:15px;line-height:1.7;color:rgba(245,240,232,0.65);">
            Your <strong style="color:#C9A84C;">${inspirationLabel}</strong>-inspired image from Cannes Lions 2026 is ready.
            ${charityLine}
          </p>
        </td></tr>
        <tr><td style="padding:0 0 24px;text-align:center;">
          <a href="${imageUrl}" target="_blank">
            <img src="${imageUrl}" alt="Your GET INSPIRED image" width="560"
              style="max-width:100%;display:block;border:0.5px solid rgba(201,168,76,0.3);" />
          </a>
        </td></tr>
        <tr><td style="padding:0 0 32px;text-align:center;">
          <a href="${imageUrl}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:16px 40px;text-decoration:none;">
            Download Your Image
          </a>
        </td></tr>
        <tr><td style="text-align:center;border-top:0.5px solid rgba(201,168,76,0.2);padding-top:24px;">
          <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(245,240,232,0.25);">GET INSPIRED · Cannes Lions 2026</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  const { data, error } = await resend.emails.send({
    from, to,
    subject: `Your GET INSPIRED image — Cannes Lions 2026`,
    html,
  })

  if (error) {
    console.error('Resend error:', JSON.stringify(error))
  } else {
    console.log('Email sent id:', data?.id, '→', to)
  }
}

// ── MAIN HANDLER ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const payload: GeneratePayload = await req.json()
    if (!payload.inspiration) {
      return NextResponse.json({ error: 'inspiration is required' }, { status: 400 })
    }

    // 1. Upload reference photo if provided
    let photoUrl: string | null = null
    if (payload.photoBase64) {
      photoUrl = await uploadPhotoToSupabase(payload.photoBase64)
      console.log('Reference photo uploaded:', photoUrl)
    }

    // 2. Build structured prompt from user selections
    const { positive, debug } = buildPrompt({
      inspiration:      payload.inspiration,
      inspirationWords: payload.inspirationWords || '',
      charityName:      payload.charity?.name,
      personName:       payload.name,
      hasPhoto:         !!photoUrl,
    })

    console.log('── PROMPT DEBUG ──')
    console.log('Theme:', debug.theme)
    console.log('Subject:', debug.subject)
    console.log('Personal voice:', debug.personalVoice)
    console.log('Charity:', debug.charity)
    console.log('─────────────────')

    // 3. Generate with FLUX.2 [pro]
    const falUrl = await generateWithFlux2Pro(positive, photoUrl)

    // 4. Mirror to Supabase (permanent URL)
    const imageUrl = await mirrorImageToSupabase(falUrl)
    console.log('Permanent URL:', imageUrl)

    // 5. Save to gallery table
    const db = supabaseAdmin()
    const { data, error } = await db
      .from('gallery')
      .insert({
        image_url:         imageUrl,
        inspiration:       payload.inspiration,
        inspiration_words: payload.inspirationWords || null,
        charity_name:      payload.charity?.name || null,
        charity_logo:      payload.charity?.logo || null,
        email:             payload.email || null,
        name:              payload.name || null,
      })
      .select('id')
      .single()

    if (error) console.error('Supabase insert error:', error)
    else console.log('Gallery row saved, id:', data?.id)

    // 6. Send email
    if (payload.email) {
      await sendEmail(
        payload.email, payload.name || '', imageUrl,
        payload.inspiration, payload.charity?.name || null
      )
    }

    return NextResponse.json({ imageUrl, galleryId: data?.id || null })

  } catch (err) {
    console.error('Generate error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Generation failed' },
      { status: 500 }
    )
  }
}
