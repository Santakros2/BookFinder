import React, { useState, useEffect } from "react";
import FavoriteBooksList from "./FavoriteBooksList";

interface UserProfileProps {
  storageKey?: string;
  initialName?: string;
  initialOccupation?: string;
  initialFavoriteGenres?: string[];
  initialBio?: string;
  initialLocation?: string;
  initialAvatarUrl?: string;
  initialEmail?: string;
}

const UserProfile = ({
  storageKey = "userProfileData",
  initialName = "",
  initialOccupation = "",
  initialFavoriteGenres = [],
  initialBio = "",
  initialLocation = "",
  initialAvatarUrl = "",
  initialEmail = "",
}: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(initialName);
  const [occupation, setOccupation] = useState(initialOccupation);
  const [favoriteGenres, setFavoriteGenres] = useState(initialFavoriteGenres);
  const [bio, setBio] = useState(initialBio);
  const [location, setLocation] = useState(initialLocation);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setName(data.name || "");
        setOccupation(data.occupation || "");
        setFavoriteGenres(data.favoriteGenres || []);
        setBio(data.bio || "");
        setLocation(data.location || "");
        setAvatarUrl(data.avatarUrl || "");
        setEmail(data.email || "");
      } catch {
        // ignore error
      }
    }
  }, [storageKey]);

  const handleGenresChange = (val: string) => {
    const genres = val
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);
    setFavoriteGenres(genres);
  };

  const saveProfile = () => {
    const dataToSave = {
      name,
      occupation,
      favoriteGenres,
      bio,
      location,
      avatarUrl,
      email,
    };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    setIsEditing(false);
  };

  return (
    <section className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name}'s avatar`}
              className="w-40 h-40 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-indigo-300 flex items-center justify-center text-3xl font-bold text-white border-2 border-indigo-500 shadow-sm">
              {name.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
          {isEditing && (
            <input
              type="text"
              placeholder="Avatar URL"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="mt-2 w-full text-xs text-gray-600 rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            ) : (
              <p className="text-gray-900 font-medium text-sm">{name || "Unnamed User"}</p>
            )}
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Occupation</label>
            {isEditing ? (
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            ) : (
              <p className="text-gray-700 text-sm">{occupation || "Not specified"}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            ) : (
              <p className="text-gray-700 text-sm">{location || "Not specified"}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            ) : (
              <p className="text-indigo-600 underline text-sm">{email || "Not specified"}</p>
            )}
          </div>

          {/* Favorite Genres */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Favorite Genres
            </label>
            {isEditing ? (
              <input
                type="text"
                value={favoriteGenres.join(", ")}
                onChange={(e) => handleGenresChange(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            ) : favoriteGenres.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {favoriteGenres.map((genre) => (
                  <span
                    key={genre}
                    className="bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full px-2 py-0.5"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic text-sm">No favorite genres listed.</p>
            )}
          </div>

          {/* Bio */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">About Me</label>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            ) : (
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{bio || "No bio provided."}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="ml-auto flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition text-sm"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Placeholder below for Favorites or other content */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-gray-200 text-center text-gray-400 text-sm italic">
       <FavoriteBooksList></FavoriteBooksList>
      </div>
    </section>
  );
};

export default UserProfile;
