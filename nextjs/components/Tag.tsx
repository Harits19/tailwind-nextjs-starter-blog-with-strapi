import Link from 'next/link'
interface Props {
  text: string
  id: number
}

const Tag = ({ text, id }: Props) => {
  return (
    <Link
      href={`/tags/${id}`}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
