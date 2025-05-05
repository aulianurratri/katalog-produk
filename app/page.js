'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { ShoppingCartIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products?limit=10', { cache: "no-store" });
  const data = await res.json();
  return data.map(item => ({
    ...item,
    stock: Math.floor(Math.random() * 10) + 1, // stok random 1-10
  }));
}

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const { addToCart, removeFromCart, isInCart, cartCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Katalog Produk</h1>
        <button onClick={() => router.push('/cart')} className="relative bg-pink-500 text-white p-3 rounded-full">
          <ShoppingCartIcon className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
            >
              <img src={item.image} alt={item.title} className="h-48 w-full object-contain mb-4" />
              <h2 className="text-lg font-bold mb-2">{item.title}</h2>
              <div className="flex items-center text-pink-500 font-bold mb-2">
                <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                {item.price}
              </div>
              <p className="text-gray-500 mb-4">Stok: {item.stock}</p>

              <button
                disabled={item.stock === 0}
                onClick={() => isInCart(item.id) ? removeFromCart(item.id) : addToCart(item)}
                className={`mt-auto ${item.stock === 0 ? "bg-gray-400 cursor-not-allowed" : isInCart(item.id) ? "bg-red-500" : "bg-pink-500"} text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2`}
              >
                {item.stock === 0 ? "Stok Habis" : isInCart(item.id) ? "Remove from Cart" : "Add to Cart"}
              </button>
            </motion.div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
