const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded">Go Home</a>
    </div>
  );
};

export default NotFound;
