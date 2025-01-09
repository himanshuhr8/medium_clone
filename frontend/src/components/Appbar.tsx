import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 bg-white  z-10">
      <div className="flex justify-between border-b px-10 py-1 ">
        <Link to="/blogs">
          <div className="flex flex-col justify-center cursor-pointer text-3xl font-bold">
            Medium
          </div>
        </Link>
        <div>
          <button
            type="button"
            onClick={() => navigate("/publish")}
            className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-4 "
          >
            Publish
          </button>
          <Avatar size="large" authorName="Hima" />
        </div>
      </div>
    </div>
  );
};
