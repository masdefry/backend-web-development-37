import { FiSearch, FiBell, FiPlay } from 'react-icons/fi';

export default function DashboardHeader() {
  return (
    <header className='flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6'>
      {/* Left */}
      <h1 className='text-lg font-semibold text-gray-800'>
        Dashboard Overview
      </h1>

      {/* Right */}
      <div className='flex items-center gap-4'>
        {/* Search */}
        <div className='relative hidden md:block'>
          <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search data...'
            className='rounded-lg bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        {/* Notification */}
        <button className='relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
          <FiBell className='text-xl' />
          <span className='absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500' />
        </button>

        {/* Start Shift */}
        <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'>
          <FiPlay className='text-base' />
          Start Shift
        </button>
      </div>
    </header>
  );
}
