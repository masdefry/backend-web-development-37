'use client';

import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useFormLogin } from '@/features/login/hooks/useFormLogin';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {formik} = useFormLogin()

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white shadow-xl p-8'>
        {/* Logo */}
        <div className='flex flex-col items-center mb-6'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold'>
            S
          </div>
          <h1 className='text-xl font-semibold text-gray-900'>SkyPOS</h1>
          <p className='text-sm text-gray-500'>Point of Sale Management</p>
        </div>

        {/* Title */}
        <h2 className='mb-6 text-center text-lg font-semibold text-gray-800'>
          Login to your account
        </h2>

        <form onSubmit={formik?.handleSubmit}>
          {/* Email */}
          <div className='mb-4'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              onChange={formik?.handleChange}
              placeholder='name@company.com'
              className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Password
            </label>

            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                onChange={formik?.handleChange}
                placeholder='Enter your password'
                className='w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPassword ? (
                  <HiOutlineEyeOff className='h-5 w-5' />
                ) : (
                  <HiOutlineEye className='h-5 w-5' />
                )}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className='mb-6 flex items-center justify-between'>
            <label className='flex items-center gap-2 text-sm text-gray-600'>
              <input
                type='checkbox'
                className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              Remember me
            </label>

            <a
              href='/forgot-password'
              className='text-sm font-medium text-blue-600 hover:underline'
            >
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button className='mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition'>
            Login →
          </button>
        </form>

        {/* Footer */}
        <div className='flex items-center justify-between text-xs text-gray-400'>
          <span>SkyPOS Enterprise v2.4.1</span>
          <div className='flex gap-4'>
            <a
              href='#'
              className='hover:text-gray-600'
            >
              Support
            </a>
            <a
              href='#'
              className='hover:text-gray-600'
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
