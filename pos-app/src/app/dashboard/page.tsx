import {
  FiDollarSign,
  FiShoppingBag,
  FiShoppingCart,
  FiUsers,
} from 'react-icons/fi';

export default function DashboardPage() {
  return (
    <>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='rounded-2xl border-gray-100 bg-white p-5 shadow-md'>
          <div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-blue-200`}
            >
              <FiDollarSign className={`text-lg text-blue-500`} />
            </div>
            <div>
              <p className='mt-2 text-sm text-gray-500'>Total Sales</p>
              <p className='text-2xl font-bold text-gray-900'>Rp.250.000.000</p>
            </div>
          </div>
        </div>
        <div className='rounded-2xl border-gray-100 bg-white p-5 shadow-md'>
          <div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-orange-200`}
            >
              <FiShoppingCart className={`text-lg text-orange-500`} />
            </div>
            <div>
              <p className='mt-2 text-sm text-gray-500'>Total Orders</p>
              <p className='text-2xl font-bold text-gray-900'>1,245</p>
            </div>
          </div>
        </div>
        <div className='rounded-2xl border-gray-100 bg-white p-5 shadow-md'>
          <div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-green-200`}
            >
              <FiUsers className={`text-lg text-green-500`} />
            </div>
            <div>
              <p className='mt-2 text-sm text-gray-500'>Total Customers</p>
              <p className='text-2xl font-bold text-gray-900'>125</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
