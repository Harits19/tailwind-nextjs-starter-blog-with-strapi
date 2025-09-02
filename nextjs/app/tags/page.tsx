import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import { genPageMetadata } from 'app/seo'
import { getTags } from '@/data/tagData'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const res = await getTags()
  const tagData = res.data.reduce<Record<string, { count: number; id: number }>>((prev, curr) => {
    prev[curr.name] = {
      count: curr.blogs?.length ?? 0,
      id: curr.id,
    }
    return prev
  }, {})

  const tagKeys = Object.keys(tagData)
  const sortedTags = tagKeys.sort((a, b) => tagData[b].count - tagData[a].count)
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            const id = tagData[t].id
            return (
              <div key={t} className="mt-2 mr-5 mb-2">
                <Tag text={t} id={id} />
                <Link
                  href={`/tags/${id}`}
                  className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                  aria-label={`View posts tagged ${t}`}
                >
                  {` (${tagData[t].count})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
