"use client";
import { StudyInterface } from "@/app/types/study";
import { useEffect, useState } from "react";

export type HandleSearchInputChangeType = (input: string) => void;
/**
 * Get filtered study list
 * @param studyData
 * @returns filtered Study list
 */
const useStudySearch = ({
  studyData,
}: {
  studyData: StudyInterface[] | undefined;
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredStudyData, setFilteredStudyData] = useState<StudyInterface[]>(
    []
  );

  useEffect(() => {
    const filterStudyData = () => {
      if (studyData) {
        const filteredData = studyData.filter(
          (study) =>
            study.studyName.toLowerCase().includes(searchInput.toLowerCase()) ||
            study.tags.some((tag) =>
              tag.toLowerCase().includes(searchInput.toLowerCase())
            )
        );
        setFilteredStudyData(filteredData);
      } else {
        setFilteredStudyData([]);
      }
    };

    filterStudyData();
  }, [searchInput, studyData]);

  const handleSearchInputChange = (input: string) => {
    setSearchInput(input);
  };

  // Return the filtered study data and the function to update the search input
  return { searchInput, filteredStudyData, handleSearchInputChange };
};

export default useStudySearch;
