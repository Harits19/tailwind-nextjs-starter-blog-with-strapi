import { baseUrl } from './constants'
import { Tag } from './tagData'

export interface BlogListResponse {
  data: Blog[]
  meta: { pagination: { page: number, pageSize: number, pageCount: number, total: number } }
}

export interface Blog {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  raw: Record<string, any>
  tags: Tag[]
}

export async function getListBlog({
  tag,
  page = 1,
  pageSize = 5,
  withCount = true,
}: {
  tag?: string
  page?: number
  pageSize?
  withCount?: boolean
}) {
  const params: Record<string, any> = {
    populate: '*',
  }
  if (tag) {
    params['filters[tags][name][$eq]'] = tag
  }

  if (page) {
    params['pagination[page]'] = page
  }

  if (pageSize) {
    params['pagination[pageSize]'] = pageSize
  }

  if (withCount) {
    params['pagination[withCount]'] = true
  }

  const queryParams = new URLSearchParams(params)
  const res = await fetch(`${baseUrl}/blogs?${queryParams.toString()}`, {
    cache: 'no-store',
  })
  const response = (await res.json()) as BlogListResponse

  console.log('res', response)

  if (!res.ok) throw new Error('Failed to fetch data')

  return response
}
