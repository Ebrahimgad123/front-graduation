"use client"
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('../../../../component/Map'), { ssr: false });

const Page = () => {
  return (
    <div>
      <LeafletMap />
    </div>
  );
};

export default Page;
