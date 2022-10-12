import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className="flex h-12 items-center px-4  justify-between shadow-md ">
      <Link href="/">
        <a className="text-lg font-bold">Demak-Ventures</a>
      </Link>

      <div>
        <Link href="/cart">
          <a className="p-2">Cart</a>
        </Link>
        <Link href="/login">
          <a className="p-2">Login</a>
        </Link>
      </div>
    </nav>
  )
}
