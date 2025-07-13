import React, { useState } from "react";
import dummyPosts from "./dummyPosts";
import PostCard from "./PostCard";

const ForumPosts = () => {
  const postsPerPage = 6;
  const [posts, setPosts] = useState(dummyPosts);
  const [currentPage, setCurrentPage] = useState(1);

  // handleVote ফাংশন – ভোট যোগ / তুলে ফেলার জন্য
  const handleVote = (postId, type) => {
    // পুরনো সব পোস্ট থেকে নতুনভাবে আপডেট করা হচ্ছে
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        // যদি এই পোস্টটাই হয় যার আইডি postId এর সমান
        if (post._id === postId) {
          // চেক করবো ইউজার (এখানে guest) আগেই vote দিয়েছে কিনা
          const alreadyUp = post.votes.up.includes("guest");
          const alreadyDown = post.votes.down.includes("guest");

          // পুরনো votes থেকে একটা কপি নিচ্ছি
          let updatedVotes = { ...post.votes };

          // যদি "up" ভোট দেয়
          if (type === "up") {
            if (alreadyUp) {
              // আগেই upvote দিলে এবার সেটা তুলে ফেলবো
              updatedVotes.up = updatedVotes.up.filter((u) => u !== "guest");
            } else {
              // নতুন করে upvote
              updatedVotes.up = [...updatedVotes.up, "guest"];

              // যদি আগেই downvote দেওয়া থাকে → সেটাও তুলে ফেলবো
              updatedVotes.down = updatedVotes.down.filter(
                (d) => d !== "guest"
              );
            }
          }

          // যদি "down" ভোট দেয়
          if (type === "down") {
            if (alreadyDown) {
              // আগেই downvote দিলে এবার সেটা তুলে ফেলবো
              updatedVotes.down = updatedVotes.down.filter(
                (d) => d !== "guest"
              );
            } else {
              // নতুন করে downvote
              updatedVotes.down = [...updatedVotes.down, "guest"];

              // যদি আগেই upvote দিয়ে থাকে → সেটাও তুলে ফেলবো
              updatedVotes.up = updatedVotes.up.filter((u) => u !== "guest");
            }
          }

          // এই পোস্টকে নতুন vote সহ রিটার্ন করবো
          return { ...post, votes: updatedVotes };
        }

        // যেসব পোস্টে ভোট দিইনি, সেগুলো আগের মতোই থাকবে
        return post;
      })
    );
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">📖 Forum Posts</h1>

      {paginatedPosts.map((post) => (
        <PostCard key={post._id} post={post} onVote={handleVote} />
      ))}

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`px-4 py-2 rounded-lg  ${
              num === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ForumPosts;
