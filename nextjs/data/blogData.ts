import { baseUrl } from './constants'

export interface BlogListResponse {
  data: Blog[]
  meta: {}
}

export interface Blog {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  raw: Record<string, any>
}

export async function getListBlogByMarkdown(name: string) {
  const res = await fetch(`${baseUrl}/blogs?populate=*&filters[tags][name][$eq]=${name}`, {
    cache: 'no-store', // biar tidak di-cache (SSR fresh data)
  })
  const response = (await res.json()) as BlogListResponse

  console.log('res', response)

  if (!res.ok) throw new Error('Failed to fetch data')

  return response
}
