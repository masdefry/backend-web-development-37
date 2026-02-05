import { Metadata, ResolvingMetadata } from 'next';
import QuantityCard from '../../components/QuantityCard';

const fetchMenuById = async (slug: string) => {
  const res = await fetch(`http://localhost:8080/api/menus/${slug}`, {
    cache: 'no-cache',
  });
  const menu = await res?.json();

  return menu?.data;
};

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const menu = await fetchMenuById(slug);

  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: menu?.name,
    description: menu?.description,
    keywords: menu?.name,
    openGraph: {
      title: menu?.name,
      description: menu?.description,
      images: [
        {
          url: menu?.imageUrl,
          width: 640,
          height: 640,
          alt: menu?.name,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: menu?.name,
      description: menu?.description,
      images: [
        {
          url: menu?.imageUrl,
          width: 640,
          height: 640,
          alt: menu?.name,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const menu = await fetchMenuById(slug);
  return (
    <>
      <h1 className='text-center text-3xl font-bold mt-3'>Detail Page</h1>
      <div className='flex justify-center'>
        <img
          src={menu?.imageUrl}
          className='bg-red-100 w-50'
        />
      </div>
      <h2 className='text-2xl font-bold text-center'>{menu?.name}</h2>
      <h3 className='text-xl text-center'>
        Rp.{menu?.price?.toLocaleString('id-ID')}
      </h3>
      <QuantityCard />
    </>
  );
}
