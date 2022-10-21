module.exports = (dateObj) => {
  const year = dateObj.getFullYear().toString();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");

  // console.log(year, month, day);

  return `${year}-${month}-${day}`;
};
