import BlogPage from 'app/blog/page'

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const pageNumber = parseInt(params.page as string)

  return <BlogPage page={pageNumber} />
}
