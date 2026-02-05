'use client';

import { useState } from 'react';
import { FiArrowRight, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

const categories = [
  'All Menu',
  'Coffee',
  'Non-Coffee',
  'Pastries',
  'Main Course',
  'Desserts',
  'Snacks',
];

const products = [
  {
    id: 1,
    name: 'Hot Espresso',
    price: 35000,
    category: 'Coffee',
    stock: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348',
  },
  {
    id: 3,
    name: 'Classic Cappuccino',
    price: 22500,
    category: 'Coffee',
    stock: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
  },
  {
    id: 4,
    name: 'Glazed Donut',
    price: 9500,
    category: 'Pastries',
    stock: 'LOW STOCK',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b',
  },
  {
    id: 5,
    name: 'Chocolate Muffin',
    price: 15500,
    category: 'Pastries',
    stock: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0',
  },
  {
    id: 7,
    name: 'Green Matcha Tea',
    price: 25000,
    category: 'Non-Coffee',
    stock: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7',
  },
  {
    id: 8,
    name: 'Penne Arrabbiata',
    price: 32500,
    category: 'Main Course',
    stock: 'IN STOCK',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
  },
];

export default function CashierPage() {
  const [activeCategory, setActiveCategory] = useState('All Menu');

  const filteredProducts =
    activeCategory === 'All Menu'
      ? products
      : products.filter((p) => p.category === activeCategory);
  return (
    <>
      <div className='grid grid-cols-12'>
        {/* Left Side */}
        <div className='col-span-9 p-3'>
          {/* Category Tabs */}
          <div className='flex gap-3 overflow-x-auto pb-2'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition
              ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-3'>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className='rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md'
              >
                <div className='aspect-square overflow-hidden rounded-xl bg-gray-100'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='h-full w-full object-cover'
                  />
                </div>

                <div className='mt-4 space-y-1'>
                  <p className='text-sm font-semibold text-gray-800'>
                    {product.name}
                  </p>

                  <div className='flex justify-between items-center'>
                    <p className='text-sm font-bold text-blue-600'>
                      Rp.{product.price.toLocaleString('id-ID')}
                    </p>

                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium
                  ${
                    product.stock === 'IN STOCK'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-orange-100 text-orange-600'
                  }
                `}
                    >
                      {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Side */}
        <div className='col-span-3'>
          <aside className='flex h-full w-full flex-col border-l border-gray-100 bg-white'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-gray-100 px-5 py-4'>
              <h2 className='text-sm font-semibold text-gray-800'>
                Current Order
              </h2>
              <button className='text-xs font-medium text-blue-600 hover:underline'>
                Clear All
              </button>
            </div>

            {/* Order List */}
            <div className='flex-1 space-y-4 overflow-y-auto px-5 py-4'>
              <div className='flex gap-3'>
                {/* Thumbnail */}
                <div className='h-12 w-12 rounded-lg bg-gradient-to-br from-orange-300 to-orange-500' />

                {/* Info */}
                <div className='flex flex-1 justify-between'>
                  <div className='w-full'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm font-medium text-gray-800'>
                          Classic Cappuccino
                        </p>
                        <p className='text-xs text-gray-500'>
                          Tidak ada catatan
                        </p>
                      </div>
                      <div className='flex flex-col items-end'>
                        <p>Rp.xxx.xxx</p>
                        <button className='text-gray-400 hover:text-red-500'>
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Qty Control */}
                    <div className='mt-2 flex w-fit items-center rounded-lg bg-gray-100'>
                      <button className='px-2 py-1 text-gray-600 hover:text-gray-800'>
                        <FiMinus size={14} />
                      </button>
                      <span className='px-3 text-sm font-medium'>1</span>
                      <button className='px-2 py-1 text-gray-600 hover:text-gray-800'>
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className='space-y-2 border-t border-gray-100 px-5 py-4 text-sm'>
              <div className='flex justify-between text-gray-600'>
                <span>Subtotal</span>
                <span>xxx</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>Tax (10%)</span>
                <span>xxx</span>
              </div>

              <div className='flex justify-between text-base font-semibold text-gray-900'>
                <span>Total</span>
                <span className='text-blue-600'>xxx</span>
              </div>
            </div>

            {/* Checkout */}
            <div className='px-5 pb-5'>
              <button className='flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700'>
                Proceed to Checkout
                <FiArrowRight />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
