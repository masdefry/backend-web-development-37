import { ApiResponse } from '@/types/api';
import axiosInstance from '@/utils/axiosInstance';

export async function sessionApi() {
  try {
    const response = await axiosInstance.get<ApiResponse<any>>('/auth/session');

    return response?.data?.data
  } catch (error) {
    console.log(error);
  }
}
