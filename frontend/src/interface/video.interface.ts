import type { IThumbnailProps } from "./thumbnail.interface"

export interface IVideoProps {
  title: string
  description?: string
  tags: string[]
  videoUrl: string
  thumbnails: IThumbnailProps[]
  _id: string
  createdAt: Date
}

export interface IVideoPaginationProps {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: number
  hasPrev: number
}
