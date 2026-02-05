import SideBar from './../components/SideBar';
import DashboardHeader from './../components/DashboardHeader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-3'>
        <SideBar />
      </div>
      <div className='col-span-9'>
        <DashboardHeader />

        <div className='p-10'>{children}</div>
      </div>
    </div>
  );
}
