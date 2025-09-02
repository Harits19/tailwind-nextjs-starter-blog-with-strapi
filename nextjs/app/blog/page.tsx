import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { getListBlog } from '@/data/blogData'

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage({ page }: { page: number }) {
  console.log('page', page)
  const response = await getListBlog({ page })
  const posts = response.data.map((item) => item.raw)
  const pagination = response.meta.pagination

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={posts}
      pagination={{ currentPage: pagination.page, totalPages: pagination.pageCount }}
      title="All Posts"
    />
  )
}
