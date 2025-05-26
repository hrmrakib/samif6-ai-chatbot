"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isLiked: boolean;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: "Professional Football Boots",
    brand: "Global Football Vault",
    price: 2500000,
    image: "/products/1.png",
    category: "Footwear",
    rating: 4.8,
    isLiked: false,
    inStock: true,
  },
  {
    id: "2",
    name: "Premium Team Jersey",
    brand: "Global Football Vault",
    price: 2500000,
    image: "/products/2.png",
    category: "Apparel",
    rating: 4.6,
    isLiked: false,
    inStock: true,
  },
  {
    id: "3",
    name: "Player Edition Kit",
    brand: "Global Football Vault",
    price: 2500000,
    image: "/products/3.png",
    category: "Apparel",
    rating: 4.9,
    isLiked: false,
    inStock: true,
  },
  {
    id: "4",
    name: "Official Match Jersey",
    brand: "Global Football Vault",
    price: 2500000,
    image: "/products/4.png",
    category: "Apparel",
    rating: 4.7,
    isLiked: false,
    inStock: true,
  },
  {
    id: "5",
    name: "Training Equipment Set",
    brand: "Global Football Vault",
    price: 2500000,
    image: "/products/5.png",
    category: "Equipment",
    rating: 4.5,
    isLiked: false,
    inStock: true,
  },
  {
    id: "6",
    name: "Professional Football Gear",
    brand: "Global Football Vault",
    price: 2500000,
    image: "/products/6.png",
    category: "Equipment",
    rating: 4.8,
    isLiked: false,
    inStock: true,
  },
  {
    id: "7",
    name: "Goalkeeper Gloves & Ball",
    brand: "Global Football Vault",
    price: 2500000,
    image: "/products/7.png",
    category: "Equipment",
    rating: 4.6,
    isLiked: false,
    inStock: true,
  },
  {
    id: "8",
    name: "Limited Edition Jersey",
    brand: "Global Football Vault",
    price: 2500000,
    image: "/products/2.png",
    category: "Apparel",
    rating: 4.9,
    isLiked: false,
    inStock: true,
  },
];

export default function ProductsSection() {
  const [productList, setProductList] = useState<Product[]>(products);
  const [cart, setCart] = useState<string[]>([]);
  const [, setWishlist] = useState<string[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleLike = (productId: string) => {
    setProductList((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, isLiked: !product.isLiked }
          : product
      )
    );

    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: string) => {
    setCart((prev) => [...prev, productId]);
    console.log(`Product ${productId} added to cart`);
    // You can add toast notification here
  };

  const viewProduct = (productId: string) => {
    console.log(`Viewing product ${productId}`);
    // You can implement product detail modal or navigation here
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <section className='min-h-screen bg-gray-900 py-16 lg:py-24'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
            Global Football Product
          </h2>
          <p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto'>
            Here&apos;s A Sample Product-Selling Website Description For A Store
            That Sells Sports-Related Items Like Jerseys And Footballs.
          </p>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {productList.map((product) => (
            <Card
              key={product.id}
              className='bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 group overflow-hidden'
            >
              <CardContent className='p-0'>
                {/* Product Image */}
                <div className='relative overflow-hidden'>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className='w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300'
                    width={400}
                    height={300}
                  />

                  {/* Overlay Actions */}
                  <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2'>
                    <Link
                      href={`/product/${product.id}`}
                      onClick={() => viewProduct(product.id)}
                      className='bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full flex items-center justify-center transition-colors duration-300' 
                    >
                      <Eye className='w-6 h-6' />
                    </Link>
                    <Button
                      size='icon'
                      variant='secondary'
                      onClick={() => toggleLike(product.id)}
                      className={`${
                        product.isLiked
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-white/90 hover:bg-white text-gray-900"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          product.isLiked ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  {/* Stock Badge */}
                  {!product.inStock && (
                    <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-500'>
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className='p-4'>
                  <div className='mb-2'>
                    <h3 className='text-white font-semibold text-lg mb-1 line-clamp-2'>
                      {product.name}
                    </h3>
                    <p className='text-gray-400 text-sm'>{product.brand}</p>
                  </div>

                  {/* Rating */}
                  <div className='flex items-center gap-1 mb-3'>
                    {renderStars(product.rating)}
                    <span className='text-gray-400 text-sm ml-1'>
                      ({product.rating})
                    </span>
                  </div>

                  {/* Price */}
                  <div className='mb-4'>
                    <span className='text-white font-bold text-xl'>
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-2'>
                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className='flex-1 bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-600 disabled:cursor-not-allowed'
                    >
                      <ShoppingCart className='w-4 h-4 mr-2' />
                      Add to Cart
                    </Button>
                    <Button
                      size='icon'
                      variant='outline'
                      onClick={() => toggleLike(product.id)}
                      className={`border-gray-600 ${
                        product.isLiked
                          ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
                          : "text-gray-400 hover:text-white hover:border-gray-500"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          product.isLiked ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className='mt-12 text-center'>
            <div className='bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md mx-auto'>
              <h3 className='text-white font-semibold text-lg mb-2'>
                Cart Summary
              </h3>
              <p className='text-gray-300 mb-4'>
                {cart.length} item(s) in cart
              </p>
              <Button className='bg-purple-600 hover:bg-purple-700 text-white w-full'>
                View Cart
              </Button>
            </div>
          </div>
        )}

        {/* Load More */}
        <div className='text-center mt-12'>
          <Button
            variant='outline'
            className='border-gray-600 bg-transparent text-white hover:bg-gray-800 hover:text-white'
          >
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  );
}
