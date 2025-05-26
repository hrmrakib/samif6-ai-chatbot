"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductData {
  id: string;
  name: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  description: string;
  sizes: string[];
  images: string[];
}

export default function ProductPage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Mock product data
  const product: ProductData = {
    id: "lorem-jersey-001",
    name: "Lorem Jersey",
    price: 12000,
    currency: "Rs.",
    rating: 5,
    reviewCount: 5,
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for",
    sizes: ["XS", "L", "XL"],
    images: ["/products/7.png"],
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 1;
    if (value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    try {
      // Simulate API call to add item to cart
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const cartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity: quantity,
        image: product.images[0],
      };

      console.log("Added to cart:", cartItem);

      // Show success feedback
      alert(
        `Added ${quantity} ${product.name} (Size: ${selectedSize}) to cart!`
      );

      // Optionally redirect to cart page
      // router.push('/cart')
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-purple-500" : "text-gray-400"
        }`}
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    ));
  };

  return (
    <div className='min-h-screen bg-[url("/product-bg.png")] bg-no-repeat bg-cover bg-center p-4 md:p-8'>
      <div className='container mx-auto'>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className='mb-6 flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200 cursor-pointer z-50'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          <span>Back</span>
        </button>

        {/* Product Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Product Image */}
          <div className='flex justify-center'>
            <div className='rounded-3xl p-8 max-w-md w-full'>
              <div className='aspect-square relative'>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={400}
                  height={400}
                  className='object-contain rounded-xl'
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className='space-y-6 text-white'>
            {/* Product Title */}
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>
              {product.name}
            </h1>

            {/* Price */}
            <div className='text-2xl md:text-3xl font-semibold'>
              {product.currency} ${product.price.toLocaleString()}
            </div>

            {/* Rating */}
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-1'>
                {renderStars(product.rating)}
              </div>
              <div className='h-6 w-px bg-gray-400'></div>
              <span className='text-gray-300'>
                {product.reviewCount} Customer Review
              </span>
            </div>

            {/* Description */}
            <p className='text-gray-300 leading-relaxed text-sm md:text-base'>
              {product.description}
            </p>

            {/* Size Selection */}
            <div className='space-y-3'>
              <h3 className='text-lg font-medium'>Size</h3>
              <div className='flex space-x-3'>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-[#534590] text-white shadow-lg"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
              {/* Quantity Selector */}
              <div className='w-max flex items-center bg-[#534590] rounded-lg overflow-hidden'>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className='border-r px-4 py-3 hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M20 12H4'
                    />
                  </svg>
                </button>
                <input
                //   type='number'
                  min='1'
                  max='99'
                  value={quantity}
                  onChange={handleQuantityInput}
                  className='w-16 py-3 text-center bg-transparent border-none outline-none text-white font-medium'
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 99}
                  className='border-l px-4 py-3 hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className='w-max bg-transparent text-white py-3 px-10 border rounded-lg text-xl font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isAddingToCart ? (
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Adding...</span>
                  </div>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>

            {/* Additional Product Info */}
            {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-700'>
              <div className='space-y-2'>
                <h4 className='font-medium text-gray-300'>Product Details</h4>
                <ul className='text-sm text-gray-400 space-y-1'>
                  <li>• Premium quality fabric</li>
                  <li>• Machine washable</li>
                  <li>• Available in multiple sizes</li>
                </ul>
              </div>
              <div className='space-y-2'>
                <h4 className='font-medium text-gray-300'>Shipping Info</h4>
                <ul className='text-sm text-gray-400 space-y-1'>
                  <li>• Free shipping over $50</li>
                  <li>• 2-3 business days delivery</li>
                  <li>• 30-day return policy</li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
