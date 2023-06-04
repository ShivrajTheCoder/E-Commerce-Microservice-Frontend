import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <nav>
            <Link href="/home">Home</Link>
            <Link href="/user/cart">Cart</Link>
        </nav>
    )
}
