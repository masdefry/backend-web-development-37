'use client';
import useAuthGuard from '@/hoc/useAuthGuard';
import { ApiResponse } from '@/types/api';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePhoto,
} from 'react-icons/hi2';

function MenusManagementPage() {
  const [menus, setMenus] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const onGetAllMenus = async () => {
    try {
      const res = await axiosInstance?.get<ApiResponse<any>>('/menus', {
        params: {
          page: page,
          limit: limit,
        },
      });
      setMenus(res?.data?.data?.menus);
      setTotalPages(res?.data?.data?.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetAllMenus();
  }, [page]);

  return (
    <>
      <div className='flex flex-wrap items-center gap-3'>
        {/* Search */}
        <div className='relative flex-1 min-w-[240px]'>
          <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search product name, SKU, or category...'
            className='w-full rounded-xl bg-gray-100 py-2.5 pl-11 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        {/* Category Filter */}
        <div className='relative inline-block'>
          <select className='appearance-none rounded-xl bg-gray-100 px-4 py-2.5 pr-10 text-sm text-gray-700 hover:bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
            <option>All Categories</option>
            <option>Coffee</option>
            <option>Non-Coffee</option>
            <option>Pastries</option>
            <option>Main Course</option>
            <option>Desserts</option>
            <option>Snacks</option>
          </select>
          <FiChevronDown
            className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
            size={16}
          />
        </div>
      </div>

      <div className='p-6'>
        <div className='rounded-2xl border border-gray-200 bg-white shadow-sm'>
          {/* Table */}
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-500'>
                <tr>
                  <th className='px-6 py-4 text-left'>Product</th>
                  <th className='px-6 py-4 text-left'>Price</th>
                  <th className='px-6 py-4 text-left'>Status</th>
                  <th className='px-6 py-4 text-right'>Actions</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-100'>
                {menus?.map((menu: any, index: number) => {
                  return (
                    <tr key={index} className='hover:bg-gray-50'>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500'>
                            <img
                              src={menu?.menuImage[0]?.imageUrl}
                              alt={menu?.description}
                              className='w-10 h-10'
                            />
                          </div>
                          <div>
                            <p className='font-medium text-gray-900'>
                              {menu?.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                              SKU: {menu?.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 font-medium'>
                        Rp.{menu?.price?.toLocaleString('id-ID')}
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`rounded-full ${menu?.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} px-3 py-1 text-xs font-medium`}
                        >
                          {menu?.isAvailable ? 'Available' : 'Not Available'}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex justify-end gap-4 text-gray-500'>
                          <button className='hover:text-blue-600'>
                            <HiOutlinePencil className='h-5 w-5' />
                          </button>
                          <button className='hover:text-red-600'>
                            <HiOutlineTrash className='h-5 w-5' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className='flex items-center justify-between px-6 py-4 text-sm text-gray-500'>
            <span>Showing 1 to 3 of 42 products</span>

            <div className='flex items-center gap-2'>
              <button className='rounded-lg border px-2 py-1 hover:bg-gray-100'>
                <HiOutlineChevronLeft />
              </button>
              {[...Array(totalPages)].map((_: any, index: number) => {
                const pageNumber = index + 1;
                return (
                  <button
                    onClick={() => setPage(index + 1)}
                    className={`rounded-lg ${pageNumber === page ? 'bg-blue-600' : 'bg-gray-300'} px-3 py-1 text-white`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button className='rounded-lg border px-2 py-1 hover:bg-gray-100'>
                <HiOutlineChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default useAuthGuard(MenusManagementPage, ['ADMIN', 'SUPER_ADMIN']);
