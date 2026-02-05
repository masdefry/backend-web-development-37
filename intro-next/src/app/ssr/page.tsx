import Link from "next/link";

const fetchMenus = async () => {
  const response = await fetch('http://localhost:8080/api/menus', {
    method: 'GET',
    // cache: 'no-cache' -> SSR
    // cache: 'force-cache', -> SSG
    next: {
      revalidate: 60, // -> ISR
    },
  });

  const menus = await response?.json();

  return menus?.data;
};

export default async function SSRPage() {
  const menus = await fetchMenus();
  return (
    <>
      <div className='grid grid-cols-5 p-10 gap-3'>
        {menus?.map((menu: any, index: number) => {
          return (
            <div className='card bg-base-100 shadow-sm' key={index}>
              <figure className='p-5'>
                <img
                  src={menu?.imageUrl}
                  alt='Shoes'
                  className='rounded-xl'
                />
              </figure>
              <div className='card-body '>
                <h2 className='card-title'>{menu?.name}</h2>
                <p>
                  {menu?.description}
                </p>
                <div className='card-actions'>
                  <Link 
                    href={`/ssr/detail/${menu?.id}`}
                  className='btn btn-primary'>Buy Now</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
