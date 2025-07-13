import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const PostCard = ({ post, onVote }) => {
    console.log(post,onVote)
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-3">{post.content}</p>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onVote(post._id, "up")}
            className="flex items-center gap-1 hover:text-green-600"
          >
            <ThumbsUp size={18} /> {post.votes.up.length}
          </button>
          <button
            onClick={() => onVote(post._id, "down")}
            className="flex items-center gap-1 hover:text-red-600"
          >
            <ThumbsDown size={18} /> {post.votes.down.length}
          </button>
        </div>
        <span>By: {post.author.name}</span>
      </div>
    </div>
  );
};

export default PostCard;
