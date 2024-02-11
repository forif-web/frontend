const getYearAndSemester = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-based index
  const year = currentDate.getFullYear();
  // Determine the semester based on the current month
  if (currentMonth > 1 && currentMonth < 8) {
    const semester = 1;
    return { year, semester };
  } else {
    const semester = 2;
    return { year, semester };
  }
};

export default getYearAndSemester;
