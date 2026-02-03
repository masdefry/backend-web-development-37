export default function TransactionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1>Transactions Page</h1>
      {children}
    </>
  );
}
