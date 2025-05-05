"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { TrashIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { cartItems, cartCount, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const handleQuantityChange = (id, qty, stock) => {
    if (qty >= 1 && qty <= stock) {
      updateQuantity(id, qty);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Cart ({cartCount})</h1>
        <button
          onClick={() => router.push('/')}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          ← Kembali ke Produk
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          Cart kamu kosong.
        </div>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center bg-white rounded-2xl shadow p-4">
              <img src={item.image} alt={item.title} className="h-20 w-20 object-contain mr-4" />
              <div className="flex-1">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-pink-500 font-semibold">${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.stock)}
                    className="px-2 py-1 bg-gray-200 rounded-l"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center bg-gray-100"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.stock)}
                    className="px-2 py-1 bg-gray-200 rounded-r"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Stock max: {item.stock}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-4">
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
