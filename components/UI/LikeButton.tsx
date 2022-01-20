import React from "react";

interface Props {
  imageDate: string;
  likeImage: Function;
  likedImages: string[];
}

const LikeButton: React.FC<Props> = ({ imageDate, likeImage, likedImages }) => {
  return (
    <div
      className="absolute bottom-4 right-4 bg-gray-100 dark:bg-gray-600 p-2 rounded-full cursor-pointer"
      onClick={() => likeImage(imageDate)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={[
          "h-8 w-8",
          likedImages.indexOf(imageDate) == -1
            ? `text-gray-600 dark:text-gray-100`
            : `text-red-600`,
        ].join(" ")}
        fill={likedImages.indexOf(imageDate) == -1 ? "none" : "#ef4444"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

export default LikeButton;
