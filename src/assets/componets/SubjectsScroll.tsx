import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import BookCard from "./BookCard";

type SubjectsScrollProps = {
  subject: string;
  books: any[];
};

const SubjectsScroll = ({ subject, books }: SubjectsScrollProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold mb-4 text-left">{subject.toUpperCase()}</h1>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-[50%] -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-[50%] -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-800" />
      </button>

      {/* Scrollable Carousel */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-1 transition-all duration-300 overflow-x-auto scroll-smooth scrollbar-hide overflow-hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
         {books.map((book) => (
            <div key={book.key} className="flex-shrink-0 w-[220px] scroll-snap-align-start">
              <BookCard
                title={book.title}
                author={book.authors?.[0]?.author?.key ? "Author" : "Unknown Author"}
                coverId={book.cover_id}
                firstPublishYear={book.first_publish_year}
              />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default SubjectsScroll;
