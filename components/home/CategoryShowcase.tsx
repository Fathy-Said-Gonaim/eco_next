import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
    description: 'Latest gadgets and tech accessories',
  },
  {
    id: 'jewelery',
    name: 'Jewelry',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    description: 'Elegant pieces for every occasion',
  },
  {
    id: "men's clothing",
    name: "Men's Clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    description: 'Stylish and comfortable apparel',
  },
  {
    id: "women's clothing",
    name: "Women's Clothing",
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    description: 'Fashion-forward designs',
  },
]

export default function CategoryShowcase() {
  return (
    <section className="bg-muted/30">
      <div className="container px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-2xl font-bold md:text-3xl mb-8">Shop by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link href={`/categories/${category.id}`} key={category.id}>
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}