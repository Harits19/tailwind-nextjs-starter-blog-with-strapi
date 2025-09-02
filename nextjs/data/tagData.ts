import { Blog } from "./blogData"
import { baseUrl } from "./constants"

export interface TagListResponse {
  data: Tag[]
  meta: Meta
}

export interface TagResponse {
  data: Tag
}

export interface Tag {
  id: number
  documentId: string
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  blogs?: Blog[]
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}


export async function getTags() {
  const res = await fetch(`${baseUrl}/tags?populate=blogs`, {
    cache: 'no-store', // biar tidak di-cache (SSR fresh data)
  })
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json() as Promise<TagListResponse>
}

