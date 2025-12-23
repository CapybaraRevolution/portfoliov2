'use client';

import dynamic from 'next/dynamic';

// Dynamically import the prototype to avoid SSR issues with react-qr-code
const PhoneMock = dynamic(
  () => import('@/components/prototypes/houston-ballet/PhoneMock'),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-[9999] bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Loading prototype...</div>
      </div>
    )
  }
);

export default function HoustonBalletDemoPage() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gray-200 flex items-center justify-center p-4 md:p-8">
      <PhoneMock />
    </div>
  );
}

