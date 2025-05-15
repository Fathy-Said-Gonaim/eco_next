import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return res.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (category === 'all') {
    return getProducts();
  }
  
  const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch category products');
  }
  
  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return res.json();
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}