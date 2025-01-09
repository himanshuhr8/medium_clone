import { Appbar } from "../components/Appbar";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
            placeholder="Title"
            required
          />
          <TextEditor onChange={(e) => setContent(e.target.value)} />
          <button
            type="submit"
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              } catch (e) {
                alert("Something went wrong");
              }
            }}
            className="inline-flex items-center text-sm text-center  focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 mb-2 mr-4 "
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};
//rich text editor with extra features?
function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <form>
      <div className="w-full mb-3 ">
        <div className="flex items-center justify-between ">
          <div className="py-2 bg-white rounded-b-lg w-full ">
            <textarea
              rows={10}
              onChange={onChange}
              className="block w-full p-2 text-lg text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
              placeholder="Tell your story..."
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
}
