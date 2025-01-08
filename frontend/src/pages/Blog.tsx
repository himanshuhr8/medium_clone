import { useBlog } from "../hooks/BlogHook";
import { useParams } from "react-router-dom";
const Blog = () => {
  const id = useParams().id as string;
  const { loading, blog } = useBlog({ id: id });
  // better to use atoms/selectors
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>{blog?.title}</div>
      <div>{blog?.content}</div>
      <div>{blog?.author.name}</div>
    </div>
  );
};
export default Blog;
