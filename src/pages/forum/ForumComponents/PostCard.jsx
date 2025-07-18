import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const PostCard = ({ post, onVote }) => {
  const author = post.role_info || {};
  const role = author.role || "member";

  const roleBadgeClass =
    role === "admin"
      ? "bg-red-600 text-white"
      : role === "trainer"
      ? "bg-green-600 text-white"
      : "bg-gray-400 text-white";

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 hover:shadow-2xl transition-shadow duration-300">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-3 text-gray-900">{post.title}</h2>

      {/* Content */}
      <p className="text-gray-700 mb-5 leading-relaxed">{post.content}</p>

      {/* Votes and Author Info */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        {/* Voting Buttons */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onVote(post._id, "up")}
            className="flex items-center gap-1 hover:text-green-600 transition-colors duration-200"
            aria-label="Upvote"
          >
            <ThumbsUp size={20} />
            <span>{post.votes?.up?.length || 0}</span>
          </button>

          <button
            onClick={() => onVote(post._id, "down")}
            className="flex items-center gap-1 hover:text-red-600 transition-colors duration-200"
            aria-label="Downvote"
          >
            <ThumbsDown size={20} />
            <span>{post.votes?.down?.length || 0}</span>
          </button>
        </div>

        {/* Author Info with Role Badge */}
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-800">
            By: {author.name || "Unknown"}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${roleBadgeClass} select-none`}
            title={role.charAt(0).toUpperCase() + role.slice(1)}
          >
            {role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

