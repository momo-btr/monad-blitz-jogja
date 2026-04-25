import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./MapExplorer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-base-300 animate-pulse flex items-center justify-center rounded-xl">
      <span className="text-black/50">Loading Map...</span>
    </div>
  ),
});

export default DynamicMap;
