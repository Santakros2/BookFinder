import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const { id } = useParams(); // e.g., OL82563W
  const [book, setBook] = useState<any>(null);
  const [author, setAuthor] = useState<string>("Unknown Author");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = stored.some((fav: any) => fav.id === id);
    setIsFavorite(exists);
  }, [id]);

  // Fetch book + author data
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);

        if (data?.authors?.length > 0) {
          const authorKey = data.authors[0].author.key;
          const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
          const authorData = await authorRes.json();
          setAuthor(authorData.name);
        }
      } catch (error) {
        console.error("Error fetching book or author data:", error);
      }
    };

    fetchBookData();
  }, [id]);

  // Toggle favorite
  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");

    // Check if this book is already favorited
    const exists = stored.some((fav: any) => fav.id === id);

    let updatedFavorites;

    if (exists) {
      updatedFavorites = stored.filter((fav: any) => fav.id !== id);
    } else {
      const newFavorite = {
        id,
        title: book.title,
        author,
        coverId: coverId || null,
      };
      updatedFavorites = [...stored, newFavorite];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!book) return <p className="p-4">Loading...</p>;

  // Description
  let descriptionText = "No description available";
  if (book.description) {
    descriptionText =
      typeof book.description === "string"
        ? book.description
        : book.description.value;
  }

  // Cover images
  const coverId = book.covers?.[0];
  const coverImgUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;

  const otherCovers = book.covers?.slice(1) || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {coverImgUrl && (
          <img
            src={coverImgUrl}
            alt={`Cover of ${book.title}`}
            className="w-48 h-auto shadow-md rounded"
          />
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-gray-700 mb-4">By {author}</p>
            </div>
            <button onClick={toggleFavorite} className="text-3xl ml-4 hover:scale-105 transition">
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
          <p className="text-gray-800 whitespace-pre-line mb-4">{descriptionText}</p>

          {book.subjects && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Subjects:</h2>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {book.subjects.slice(0, 10).map((subject: string, index: number) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Additional cover images */}
      {otherCovers.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Other Cover Images</h2>
          <div className="flex gap-4 flex-wrap">
            {otherCovers.map((id: number) => (
              <img
                key={id}
                src={`https://covers.openlibrary.org/b/id/${id}-M.jpg`}
                alt="Additional cover"
                className="w-32 h-auto rounded shadow"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
