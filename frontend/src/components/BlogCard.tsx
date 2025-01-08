import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
  id: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  authorName,
  publishedDate,
  title,
  content,
  id,
}) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 pb-4 border-b border-slate-200 w-screen max-w-screen-md cursor-pointer">
        <div className="flex ">
          <Avatar size="small" authorName={authorName} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-base font-thin">{content.slice(0, 100)}...</div>
        <div className="font-thin text-slate-500 text-sm my-3 ">
          {publishedDate}
        </div>
      </div>
    </Link>
  );
};
