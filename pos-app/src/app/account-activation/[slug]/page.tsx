'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
export default function SetPasswordPage() {
  const params = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi tidak cocok.');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.put('/auth/activation', {
        password: password,
      }, {
        headers: {
          'Authorization': `Berarer ${params?.slug}`
        }
      });
      console.log(res);
    } catch (err) {
      setError('Terjadi kesalahan sistem. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-lg'>
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-2'>
          Account Activation
        </h2>
        <p className='text-sm text-gray-500 text-center mb-6'>
          Set your new password to activate new account.
        </p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              required
              className='mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Confirm Password
            </label>
            <input
              type='password'
              required
              className='mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className='text-sm text-red-500 mt-2'>{error}</p>}
          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Loading...' : 'Activate Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
