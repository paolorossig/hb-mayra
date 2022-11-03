import Head from 'next/head'
import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-sky-200 text-gray-900">
      <Head>
        <title>Mayra Fest</title>
        <meta
          name="description"
          content="Website de los recuerdos de Mayra Fest"
        />
        <link rel="icon" href="/mariposa.png" />
      </Head>
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
        <header className="flex py-4">
          <Link href="/" className="mx-auto text-2xl font-bold uppercase">
            Mayra Fest
          </Link>
        </header>
        <main className="relative flex flex-1 flex-col items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
