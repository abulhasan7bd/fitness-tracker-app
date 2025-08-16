
import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../hooks/UseAxios";
import { Link } from "react-router-dom"; // for client-side routing
 

const Forum_Post = () => {
  const axiosInstance = UseAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const response = await axiosInstance.get("/forums");
      return response.data;
    },
  });

  const posts = data?.slice(0, 6) || [];


   if (isLoading || isError) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Latest Forum Posts
        </h2>
        <p className={`text-${isError ? "red-600" : "gray-500"} font-medium`}>
          {isError ? `Error: ${error.message}` : "Loading posts..."}
        </p>
      </section>
    );
  }

  return (
 <section className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-colors">
  <h2 className="text-3xl font-bold mb-12 text-center text-[#239BA7] dark:text-[#CADCAE]">
    Latest Forum Posts
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {posts.map((post) => {
      const {
        _id,
        title,
        content,
        role_info: { name, email, photoURL, role },
      } = post;

      return (
        <article
          key={_id}
          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out border border-[#7ADAA5] dark:border-[#239BA7]"
        >
          {/* Title */}
          <Link to={`/forum/${_id}`}>
            <h3 className="text-xl font-semibold mb-3 text-[#239BA7] dark:text-[#CADCAE] hover:text-[#7ADAA5] dark:hover:text-[#239BA7] transition-colors duration-200">
              {title || "Untitled"}
            </h3>
          </Link>

          {/* Content preview */}
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
            {content?.slice(0, 100)}...
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-4 mt-4">
            <img
              src={photoURL}
              alt={name}
              className="w-10 h-10 rounded-full object-cover border border-[#7ADAA5] dark:border-[#239BA7]"
            />
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {name}{" "}
                <span className="text-xs bg-[#7ADAA5]/30 dark:bg-[#239BA7]/30 text-[#239BA7] dark:text-[#CADCAE] px-2 py-0.5 rounded ml-2">
                  {role}
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
            </div>
          </div>

          {/* Date + Read more */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-400 dark:text-gray-500"></span>

            <Link
              to={`/forum/${_id}`}
              className="text-[#239BA7] dark:text-[#CADCAE] font-medium hover:text-[#7ADAA5] dark:hover:text-[#239BA7] text-sm transition-colors"
            >
              Read More &rarr;
            </Link>
          </div>
        </article>
      );
    })}
  </div>
</section>

  );
};

export default Forum_Post;
