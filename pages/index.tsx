import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Layout>
      <span>
        Feliz cumpleaños <strong className="text-black">Mayra</strong>
      </span>
      <div className="absolute right-0 bottom-2">
        <Link href="/create">
          <i className="grid h-10 w-10 place-content-center rounded-full bg-blue-500 text-white hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </i>
        </Link>
      </div>
    </Layout>
  )
}

export default Home
