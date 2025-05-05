'use client';

import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Navbar({ cartCount }) {
  return (
    <nav className="bg-pink-500 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">My Shop</h1>
      <div className="relative">
        <ShoppingCartIcon className="h-8 w-8" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-white text-pink-500 rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </nav>
  );
}
