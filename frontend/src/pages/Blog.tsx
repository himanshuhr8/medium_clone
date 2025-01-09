import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/Avatar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlog } from "../hooks/BlogHook";
import { useParams } from "react-router-dom";
const Blog = () => {
  const id = useParams().id as string;
  const { loading, blog } = useBlog({ id: id });
  // better to use atoms/selectors
  console.log(blog);
  if (loading || !blog) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  const wordsPerMinute = 200;
  const wordCount = Number(blog?.content.split(/\s+/).length);
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          <div className="border-b border-slate-200 pb-4 mt-5">
            <div className="text-5xl font-extrabold">{blog?.title}</div>
            <div className="flex mt-8">
              <Avatar authorName="Hima" size="large" />

              <div className="ml-4 flex justify-center flex-col">
                {blog?.author.name}
                <div className="flex text-slate-500">
                  <div>{readingTime} min read</div>
                  {/* center dot missing? */}
                  <div className="ml-2">Jan 8, 2025</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-lg">{blog?.content}</div>
        </div>
      </div>
    </div>
  );
};
export default Blog;
