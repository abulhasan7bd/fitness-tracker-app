import React from "react";

const dummyPosts = [
  {
    id: 1,
    title: "How to Stay Motivated During Workouts",
    excerpt: "Discover tips and tricks to keep your fitness motivation high throughout the year.",
    url: "/blog/stay-motivated",
  },
  {
    id: 2,
    title: "Top 10 Healthy Snacks for Fitness Enthusiasts",
    excerpt: "Learn about nutritious snacks that fuel your workouts and recovery.",
    url: "/blog/healthy-snacks",
  },
  {
    id: 3,
    title: "Beginner’s Guide to Running",
    excerpt: "Start running with confidence and avoid common beginner mistakes.",
    url: "/blog/beginners-running-guide",
  },
  {
    id: 4,
    title: "The Benefits of Yoga for Mental Health",
    excerpt: "Explore how yoga can improve your mental well-being and reduce stress.",
    url: "/blog/yoga-mental-health",
  },
  {
    id: 5,
    title: "How to Track Your Progress Effectively",
    excerpt: "Tips on using fitness trackers and apps to monitor your journey.",
    url: "/blog/track-progress",
  },
  {
    id: 6,
    title: "Best Post-Workout Recovery Techniques",
    excerpt: "Recover faster and avoid injury with these proven recovery methods.",
    url: "/blog/post-workout-recovery",
  },
];

const Latest_Post = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest Community Posts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyPosts.map((post) => (
          <article key={post.id} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.excerpt}</p>
            <a
              href={post.url}
              className="text-blue-700 hover:text-blue-900 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Latest_Post;
