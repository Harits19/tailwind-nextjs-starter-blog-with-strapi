import useSWR, { Fetcher, SWRHook } from 'swr'

type SWRKey = 'tags'

export default function useMySWR<Data>(key: SWRKey, fetcher: Fetcher<Data, SWRKey> | null) {
  return useSWR(key, fetcher)
}
