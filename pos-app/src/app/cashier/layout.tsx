import SideBar from './../components/SideBar';
import DashboardHeader from './../components/DashboardHeader';
import CashierHeader from '../components/CashierHeader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CashierHeader />
      {children}
    </>
  );
}
