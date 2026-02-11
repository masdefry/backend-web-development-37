'use client';

import { ComponentType, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';

export default function useAuthGuard<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[],
) {
  return function AuthGuardComponent(props: P) {
    const { role } = useAuthStore();
    console.log(role);
    const isAuthorized = allowedRoles.includes(role);

    if (!isAuthorized) {
      return <h1 className='font-bold text-2xl'>User role unauthorized to open this page</h1>;
    }

    return <WrappedComponent {...props} />;
  };
}
