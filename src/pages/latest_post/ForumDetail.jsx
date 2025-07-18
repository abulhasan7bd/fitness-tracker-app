import React from "react";
import { useParams } from "react-router-dom";
import UseAxios from "../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";

const ForumDetail = () => {
  const { id } = useParams();
  const axiosInstance = UseAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["forumDetail", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/forum/${id}`);
      return res.data[0];
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>Loading forum post details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-600">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
        <p>No forum post found.</p>
      </div>
    );
  }

  const post = data;
  const { title, content, role_info, votes, createdAt } = post;

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-md shadow-md p-8 my-12">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{title}</h1>

      {/* Author Info */}
      <div className="mb-6 flex items-center gap-4 text-gray-600">
        <img
          src={role_info?.photoURL}
          alt={role_info?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-md">
            By <strong>{role_info?.name || "Unknown Author"}</strong>
          </p>
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="prose prose-lg max-w-none text-gray-800 mb-10">
        {content}
      </article>

      {/* Vote counts */}
      <div className="flex items-center space-x-10 mb-10">
        {/* 👍 Like */}
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/889/889140.png"
            alt="like"
            className="w-6 h-6"
          />
          <span className="text-gray-700 font-medium">
            {votes?.up?.length || 0}
          </span>
        </div>

        {/* 👎 Dislike */}
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/889/889142.png"
            alt="dislike"
            className="w-6 h-6"
          />
          <span className="text-gray-700 font-medium">
            {votes?.down?.length || 0}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ForumDetail;
