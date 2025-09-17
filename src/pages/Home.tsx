import { useFetchBooks } from "../assets/hooks/useFetchBooks";
import SubjectsScroll from "../assets/componets/SubjectsScroll";
import SearchBook from "../assets/componets/SearchBook";
import DarkModeToggle from "../assets/componets/DarkModeToggle";



const Home = () => {
  const subjects = ["fantasy", "science fiction", "romance", "adventure"];
  const bookData = useFetchBooks(subjects);
 
console.log("bookData:", bookData);


  return (
    <div className="p-4 space-y-10">
      <SearchBook></SearchBook>
     
     {/* <div>
        <h1 className="text-3xl font-bold mb-5">TRENDING GENRE</h1>
      </div>
      {subjects?.map((subject) => (
        <SubjectsScroll
          key={subject}
          subject={subject}
          books={bookData[subject] || []}
        />
           ))} */}
    </div>
  );
};

export default Home;
