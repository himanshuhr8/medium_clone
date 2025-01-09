export const BlogsSkeleton = () => {
  return (
    <div className="p-4 pb-4 border-b border-gray-200 w-screen max-w-md animate-pulse">
      <div className="flex">
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 ml-2 mt-2"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mt-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mt-3"></div>
    </div>
  );
};
