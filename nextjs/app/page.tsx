import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { getListBlog } from '@/data/blogData'

export default async function Page() {
  const response = await getListBlog({})
  const posts = response.data?.map((item) => item.raw) ?? []

  return <Main posts={posts} />
}
