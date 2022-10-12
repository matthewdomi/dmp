import Head from 'next/head'
import Navbar from './Navbar'

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Demak Ventures' : 'Demak Ventures'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <Navbar />
        </header>
        <main className="container m-auto mt-4 px-4 ">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          <p>Copyright @ 2022 Demak Ventures</p>
        </footer>
      </div>
    </>
  )
}
