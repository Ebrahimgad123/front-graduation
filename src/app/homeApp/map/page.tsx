"use client"
import dynamic from 'next/dynamic';

// استيراد المكون ديناميكيًا مع تعطيل الـ SSR
const LeafletMap = dynamic(() => import('../../../component/Map'), { ssr: false });

const Page = () => {
  return (
    <div>
      <LeafletMap />
    </div>
  );
};

export default Page;
