import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import TagView from './components/TagView'

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params

  return <TagView tag={params.tag} />
}
