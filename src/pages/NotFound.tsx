import React from "react";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
    <img
      src="https://rackset.com/wp-content/uploads/2022/02/funny-404-page-not-found.jpeg"
      alt="Funny Not Found Illustration"
      className="w-59 h-56 mb-4"
      style={{ maxWidth: "100%", height: "auto" }}
    />
    <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
    <p className="text-lg text-gray-700 mb-6">
      Oops! We couldn’t find what you’re looking for.
    </p>
    <a
      href="/"
      className="inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
    >
      Take Me Home
    </a>
  </div>
);

export default NotFound;
