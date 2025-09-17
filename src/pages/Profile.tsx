
import UserProfile from "../assets/componets/UserProfile";

export default function Profile() {
  return <><h1 className="text-2xl p-4 font-bold">Your Profile 👤</h1>
       <UserProfile
  storageKey="myBookFinderUserProfile"
  initialName="Alice Johnson"
  initialOccupation="Book Reviewer"
  initialFavoriteGenres={["Fantasy", "Romance"]}
  initialBio="Avid reader and writer sharing my thoughts on books."
  initialLocation="New York, USA"
  initialAvatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
  initialEmail="alice@example.com"
/>


  </>;
}
