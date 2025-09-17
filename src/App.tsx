import { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import BookDetails from "./pages/BookDetails.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage or system preference on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div className={isDark ? "bg-gray-900 text-gray-100 min-h-screen" : "bg-white text-gray-900 min-h-screen"}>
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">BookFinder</div>

          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-gray-300">Profile</Link>
            </li>

            {/* Dark mode toggle button */}
            <li>
              <button
                onClick={toggleDarkMode}
                className="ml-4 px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-800 transition"
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/works/:id" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
