import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { useBlogs } from "../hooks/BlogHook";

const Blog = () => {
  const { loading, blogs } = useBlogs();
  if (loading || !blogs) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center ">
          <div className="max-w-xl">
            <BlogsSkeleton />
            <BlogsSkeleton />
            <BlogsSkeleton />
            <BlogsSkeleton />
            <BlogsSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              authorName={blog.author.name}
              publishedDate="Jan 8, 2025"
              title={blog.title}
              content={blog.content}
              id={blog.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Blog;
