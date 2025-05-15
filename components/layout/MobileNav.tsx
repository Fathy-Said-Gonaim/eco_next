"use client"

import Link from 'next/link'

export default function MobileNav() {
  const categories = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/categories/all" },
    { name: "Electronics", href: "/categories/electronics" },
    { name: "Jewelry", href: "/categories/jewelery" },
    { name: "Men's Clothing", href: "/categories/men's clothing" },
    { name: "Women's Clothing", href: "/categories/women's clothing" },
  ]

  return (
    <div className="mt-8 flex flex-col space-y-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="flex items-center py-2 text-lg font-semibold transition-colors hover:text-primary"
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}