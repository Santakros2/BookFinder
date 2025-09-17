import React from "react";
import { Link } from "react-router-dom";

type BookCardProps = {
  workKey: string;
  title: string;
  author: string;
  coverId?: number;
  firstPublishYear?: number;
 
};



const BookCard: React.FC<BookCardProps> = ({ workKey, title, author, coverId, firstPublishYear }) => {
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

    const workId = workKey.split("/").pop();

  return (
    <Link to = {`/works/${workId}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-52 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={coverUrl} alt={title} className="w-full h-64 object-cover" />
        <div className="p-3">
          <h3 className="text-md font-semibold truncate">{title}</h3>
          <p className="text-sm text-gray-600 truncate">by {author}</p>
          {firstPublishYear && (
            <p className="text-xs text-gray-400">First published: {firstPublishYear}</p>
          )}
        </div>
      </div>
    </Link>

  );
};

export default BookCard;
