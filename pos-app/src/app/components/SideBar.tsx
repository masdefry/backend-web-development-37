import {
  FiHome,
  FiShoppingCart,
  FiBox,
  FiGrid,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiMoreVertical,
} from 'react-icons/fi';

const menuMain = [
  { label: 'Dashboard', icon: FiHome, active: true },
  { label: 'Sales', icon: FiShoppingCart },
  { label: 'Products', icon: FiBox },
  { label: 'Categories', icon: FiGrid },
  { label: 'Customers', icon: FiUsers },
];

const menuAdmin = [
  { label: 'Reports', icon: FiBarChart2 },
  { label: 'Settings', icon: FiSettings },
];

export default function SideBar() {
  return (
    <aside className='flex h-screen flex-col border-r border-gray-100 bg-white'>
      {/* Logo */}
      <div className='flex items-center gap-3 px-6 py-5'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold'>
          S
        </div>
        <span className='text-lg font-semibold text-gray-800'>SkyPOS</span>
      </div>

      {/* Menu */}
      <nav className='flex-1 px-4'>
        {/* Main Menu */}
        <p className='mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400'>
          Main Menu
        </p>

        <ul className='space-y-1'>
          {menuMain.map((item) => (
            <li key={item.label}>
              <button
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                  ${
                    item.active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <item.icon className='text-lg' />
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Admin */}
        <p className='mb-2 mt-6 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400'>
          Admin
        </p>

        <ul className='space-y-1'>
          {menuAdmin.map((item) => (
            <li key={item.label}>
              <button className='flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100'>
                <item.icon className='text-lg' />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className='border-t border-gray-100 px-4 py-4'>
        <div className='flex items-center gap-3'>
          <img
            src='https://i.pravatar.cc/40'
            alt='User Avatar'
            className='h-10 w-10 rounded-full'
          />
          <div className='flex-1'>
            <p className='text-sm font-semibold text-gray-800'>Alex Johnson</p>
            <p className='text-xs text-gray-500'>Store Manager</p>
          </div>
          <button className='text-gray-400 hover:text-gray-600'>
            <FiMoreVertical />
          </button>
        </div>
      </div>
    </aside>
  );
}
