import { FiSearch, FiBell, FiSettings, FiLogOut } from 'react-icons/fi';

export default function CashierHeader() {
  return (
    <header className='flex h-16 items-center gap-4 border-b border-gray-100 bg-white px-6'>
      {/* Left - Logo */}
      <div className='flex items-center gap-3'>
        <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold'>
          S
        </div>

        <div className='leading-tight'>
          <p className='text-sm font-semibold text-gray-800'>SkyPOS</p>
          <p className='text-xs text-gray-500'>Order Menu</p>
        </div>
      </div>

      {/* Center - Search */}
      <div className='flex flex-1 justify-center'>
        <div className='relative w-full max-w-xl'>
          <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search products or scan barcode (F1)'
            className='w-full rounded-lg bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className='flex items-center gap-3'>
        <button className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
          <FiBell className='text-lg' />
        </button>

        <button className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
          <FiSettings className='text-lg' />
        </button>

        <button className='flex items-center gap-2 rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50'>
          <FiLogOut className='text-base' />
          End Shift
        </button>
      </div>
    </header>
  );
}
