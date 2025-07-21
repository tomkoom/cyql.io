export type Tokens = { e8s: number }

export interface Pagination {
  itemsPerPage: number
  itemOffset: number
  endOffset: number
  totalItems: number
  selectedPage: number
}

export interface CompressedFile {
  url: string
  name?: string
  size: number
  blob: Blob
  file?: File
}

export interface PromoModalData {
  color: string
  backgroundColor: string
  title: string
  text: string
  ctaUrl: string
  ctaText: string
}

export type Category = {
  id: string
  label: string
}
