import type { NextPage } from 'next'
import type { Post } from '@prisma/client'
import useSWR from 'swr'
import Link from 'next/link'
import { fetcher } from '@lib/utils'

import Card from '@components/Card'
import Layout from '@components/Layout'
import Spinner from '@components/Spinner'
import PlusIcon from '@components/icons/PlusIcon'

const Home: NextPage = () => {
  const { data, error } = useSWR<Post[]>('/api/post', fetcher)

  return (
    <Layout>
      {error ? (
        <div className="text-center">
          <p className="text-2xl">An error has occurred.</p>
        </div>
      ) : !data ? (
        <Spinner />
      ) : (
        <section className="flex flex-col gap-4">
          {data.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </section>
      )}

      <div className="sticky bottom-2 z-10 flex w-full justify-end">
        <Link
          href="/create"
          className="grid h-12 w-12 place-content-center rounded-full bg-primary text-white hover:cursor-pointer"
        >
          <PlusIcon className="h-8 w-8" />
        </Link>
      </div>
    </Layout>
  )
}

export default Home
