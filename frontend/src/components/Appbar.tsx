import { Avatar } from "./Avatar";

export const Appbar = () => {
  return (
    <div className="flex justify-between border-b px-10 py-4">
      <div className="flex flex-col justify-center">Medium</div>
      <div>
        <Avatar size="large" authorName="Hima" />
      </div>
    </div>
  );
};
