import { stringify } from 'qs'
import { baseUrl } from './constants'
import { Tag } from './tagData'

export interface BlogListResponse {
  data: Blog[]
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } }
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

  params['sort'] = 'date:desc'

  const query = stringify(params, { encodeValuesOnly: true })

  const url = `${baseUrl}/blogs?${query}`
  const res = await fetch(url, {
    cache: 'no-store',
  })
  const response = (await res.json()) as BlogListResponse

  if (!res.ok) throw new Error('Failed to fetch data')

  return response
}
