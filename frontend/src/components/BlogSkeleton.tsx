export const BlogSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="border-b border-slate-200 pb-4 mt-5">
        <div className="h-12  bg-gray-200 rounded "></div>
        <div className="flex mt-8">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div className="ml-4 flex justify-center flex-col">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="flex text-slate-500 mt-2">
              <div className="h-4 bg-gray-200 rounded w-10"></div>
              <div className="ml-2 h-4 bg-gray-200 rounded w-10"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-lg">
        <div className="h-4 my-1 bg-gray-200 rounded w-full"></div>
        <div className="h-4 my-1 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 my-1 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 my-1 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 my-1 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 my-1 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
};
