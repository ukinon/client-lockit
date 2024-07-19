import React from "react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/ui/MapComponent"), {
  loading: () => <p>Memuat peta... </p>,
  ssr: false,
});

const Page: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">LockIt Terdekat</h1>
      <MapComponent />
    </div>
  );
};

export default Page;
