import React from "react";

import PostCard from "./PostCard";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import { Helmet } from "react-helmet";

const ForumPosts = () => {
  console.log("render form post");
  const useAxios = UseAxios();
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const {
    data: forums = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await useAxios.get("/forums");
      return res.data;
    },
  });

  // provide your vote
  const onVote = async (id, type) => {
    console.log("click");
    try {
      const res = await useAxios.patch(`/forums/${id}/vote`, {
        email: user.email,
        
        type,
      });
      console.log(res);
      queryClient.invalidateQueries(["forums"]);
    } catch (error) {
      console.error("Vote error:", error);
    }
  };

  console.log(forums)
  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  if (error) {
    return <p className="text-red-300">{error.message}</p>;
  }
  return (
    <>
      <Helmet>
        <title>FitTrack | ForumsPage</title>
      </Helmet>
      <div className="max-w-3xl mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-4">📖 Forum Posts</h1>

        {forums.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            forums={forums}
            onVote={onVote}
          />
        ))}
      </div>
    </>
  );
};

export default ForumPosts;
