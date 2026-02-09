import { User } from '@/features/login/types';
import axiosInstance from '@/utils/axiosInstance';
import { ApiResponse } from '@/types/api';

export async function loginApi({
  email,
  password,
}: Pick<User, 'email' | 'password'>) {
  try {
    const response = await axiosInstance.post<ApiResponse<any>>('/auth/login', {
      email,
      password,
    });

    return response?.data?.data
  } catch (error) {
    console.log(error);
  }
}
