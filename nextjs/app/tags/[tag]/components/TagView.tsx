import { getListBlog } from '@/data/blogData'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'

export default async function TagView(props: { tag: string; page?: number }) {
  const tag = decodeURI(props.tag)
  const response = await getListBlog({ tag, page: props.page })
  const title = tag[0].toUpperCase() + tag.slice(1)
  const filteredPosts = response.data?.map((item) => item.raw) ?? []

  const pagination = response.meta.pagination

  return (
    <ListLayoutWithTags
      posts={filteredPosts}
      pagination={{
        currentPage: pagination.page,
        totalPages: pagination.pageCount,
      }}
      title={title}
    />
  )
}
