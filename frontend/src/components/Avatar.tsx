import React from "react";

interface AvatarProps {
  size: "small" | "large";
  authorName: string;
}
export const Avatar: React.FC<AvatarProps> = ({ authorName, size }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span
        className={`font-extralight ${
          size === "small" ? "text-xs" : "text-lg"
        } text-xs text-gray-600 dark:text-gray-300`}
      >
        {authorName[0]}
      </span>
    </div>
  );
};
