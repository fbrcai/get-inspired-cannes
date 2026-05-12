export interface Charity {
  name: string
  cause: string
  description: string
  logo: string
  url?: string
}

export interface GalleryItem {
  id: string
  image_url: string
  inspiration: string
  inspiration_words: string | null
  charity_name: string | null
  charity_logo: string | null
  created_at: string
}

export interface GeneratePayload {
  inspiration: string
  inspirationWords: string
  charity: Charity | null
  photoBase64: string | null   // base64 JPEG, no data: prefix
  email: string
  name: string
}

export interface GenerateResult {
  imageUrl: string
  galleryId: string
}
