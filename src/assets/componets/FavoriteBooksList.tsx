import { useEffect, useState } from "react";

const FavoriteBooksList = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setBooks(stored);
  }, []);

  if (books.length === 0) {
    return <p className="text-gray-500 italic">No favorite books yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => {
        const coverUrl = book.coverId
          ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
          : "https://via.placeholder.com/150x220?text=No+Cover";

        return (
          <div
            key={book.id}
            className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition"
          >
            <img
              src={coverUrl}
              alt={book.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-md font-semibold mb-1 text-gray-800">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500">
                by {book.author || "Unknown Author"}
              </p>

              <a
                href={`/works/${book.id}`}
                className="inline-block mt-3 text-indigo-600 text-sm font-medium hover:underline"
              >
                View Details →
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteBooksList;
