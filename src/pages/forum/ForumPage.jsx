 import React, { useEffect, useState } from "react";
import dummyPosts from "./forum";

const POSTS_PER_PAGE = 6;

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(dummyPosts.length / POSTS_PER_PAGE);

  useEffect(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    setPosts(dummyPosts.slice(start, end));
  }, [page]);

  const handleVote = (id, type) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              upVotes: type === "up" ? post.upVotes + 1 : post.upVotes,
              downVotes: type === "down" ? post.downVotes + 1 : post.downVotes
            }
          : post
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Community Forum</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-5 shadow-md rounded-xl">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700 mt-2">{post.content}</p>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => handleVote(post.id, "up")}
                className="text-green-600 hover:scale-110 transition"
              >
                👍 {post.upVotes}
              </button>
              <button
                onClick={() => handleVote(post.id, "down")}
                className="text-red-600 hover:scale-110 transition"
              >
                👎 {post.downVotes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-full ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;

 