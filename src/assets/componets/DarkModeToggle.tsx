import { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setIsDark(true);
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <>
      <button onClick={toggle} className="px-4 py-2 border rounded">
        {isDark ? "Switch to Light" : "Switch to Dark"}
      </button>

      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <p>This div changes color based on toggle.</p>
      </div>
    </>
  );
};

export default DarkModeToggle;
