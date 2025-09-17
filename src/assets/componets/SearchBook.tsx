import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { useFetchBooks } from "../hooks/useFetchBooks";

export default function SearchBook() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);

  const query = searchParams.get("q") || "";
  const author = searchParams.get("author") || "";
  const subject = searchParams.get("subject") || "";
  const page = searchParams.get("page") || "1";
  
  

  useEffect(() => {
    if (!query && !author && !subject) return;

    let apiUrl = `https://openlibrary.org/search.json?`;

    if (query) apiUrl += `title=${query}&`;
    if (author) apiUrl += `author=${author}&`;
    if (subject) apiUrl += `subject=${subject}&`;

    apiUrl += `limit=50&page=${page}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setBooks(data.docs || []));
  }, [query, author, subject, page]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const title = (formData.get("title") as string)?.trim();
        const author = (formData.get("author") as string)?.trim();
        const subject = (formData.get("subject") as string)?.trim();
        // const cover_id = (formData.get("cover_id") as string)?.trim();

        const newParams: Record<string, string> = {};
        if (title) newParams.q = title;
        if (author) newParams.author = author;
        if (subject) newParams.subject = subject;
        newParams.page = "1";

        setSearchParams(newParams);
    };


  return (
    <div className="p-4">
     <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 mb-4">
        <input
            type="text"
            name="title"
            defaultValue={query}
            placeholder="Search by title"
            className="border p-2"
        />
        <input
            type="text"
            name="author"
            defaultValue={author}
            placeholder="Search by author"
            className="border p-2"
        />
        <input
            type="text"
            name="subject"
            defaultValue={subject}
            placeholder="Search by subject"
            className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Search
        </button>
      </form>


      <div>
        {books.length === 0 ? (<>
          <p>No results found</p>
           
        </>) : (
          <ul className="space-y-2">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {books.map((book) => (
                    <BookCard
                    workKey={book.key}
                    title={book.title}
                    author={book.author_name?.[0] || "Unknown Author"}
                    coverId={book.cover_i}
                    firstPublishYear={book.first_publish_year}
                    
                    />
                ))}
            </div>
             <div className="flex items-center justify-center gap-4 mt-6">
            <button
                disabled={Number(page) === 1}
                onClick={() => setSearchParams(prev => {
                const newPage = Math.max(1, Number(page) - 1);
                return { ...Object.fromEntries(prev.entries()), page: newPage.toString() };
                })}
                className={`px-4 py-2 rounded text-white transition ${
                Number(page) === 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                ← Previous
            </button>

            <span className="font-semibold text-lg text-gray-800">Page {page}</span>

            <button
                onClick={() => setSearchParams(prev => {
                const newPage = Number(page) + 1;
                return { ...Object.fromEntries(prev.entries()), page: newPage.toString() };
                })}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
                Next →
            </button>
        </div>

          </ul>
          
          
        )}
        

        
      </div>
    </div>
  );
}
