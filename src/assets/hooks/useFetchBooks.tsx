import { useEffect, useState } from "react";

export const useFetchBooks = (subjects: string[]) => {
  const [bookData, setBookData] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      const savedDataString = localStorage.getItem("trendingGenresData");
      let savedData: Record<string, any[]> = {};

      if (savedDataString) {
        try {
          savedData = JSON.parse(savedDataString);
        } catch {
          savedData = {};
        }
      }

      // Check which subjects are missing or empty in saved data
      const missingSubjects = subjects.filter(
        (subject) => !savedData[subject] || savedData[subject].length === 0
      );

      // Fetch only missing subjects
      const newData: Record<string, any[]> = { ...savedData };

      if (missingSubjects.length > 0) {
        for (const subject of missingSubjects) {
          try {
            const res = await fetch(
              `https://openlibrary.org/subjects/${subject.replace(/\s+/g, "_").toLowerCase()}.json?limit=10`
            );
            if (!res.ok) throw new Error(`Failed to fetch ${subject}`);
            const data = await res.json();
            newData[subject] = data.works || [];
          } catch (error) {
            console.error(error);
            newData[subject] = [];
          }
        }

        // Save merged data back to localStorage
        localStorage.setItem("trendingGenresData", JSON.stringify(newData));
      }

      setBookData(newData);
    };

    fetchData();
  }, [subjects]);

  return bookData;
};
