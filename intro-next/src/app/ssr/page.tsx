const fetchMenus = async () => {
  const response = await fetch('http://localhost:8080/api/menus', {
    method: 'GET',
    cache: 'no-store',
  });

  const menus = await response?.json();

  return menus?.data;
};

export default async function SSRPage() {
  const menus = await fetchMenus();
  return (
    <>
      <h1>SSR Page</h1>
      <ul>
        { 
            menus?.map((menu: any, index: number) => {
                return(
                    <li key={index}>
                        {menu?.name}
                    </li>
                )
            })
        }
      </ul>
    </>
  );
}
