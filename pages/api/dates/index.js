const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const leapYear = (year) => {
  //A year is leap, if it's divisible by 4 but not 100 OR if it's divisible by 400 (equally)
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
};

const countDays = (date) => {
  let localDays = 0;

  //We start by counting days per year (leading up to this one)
  localDays += 365 * date.year - 1;

  //Then we add the days for the current month
  localDays += date.day;

  //Then we add for each month until current month
  for (let y = 0; y < date.month - 1; y++) {
    localDays += daysInMonth[y];
  }

  //Then we check all the years for leap - including this (if month is after feb!)
  let localYears = date.year;

  if (date.month <= 2) {
    localYears -= 1;
  }

  for (let i = 0; i < localYears; i++) {
    if (leapYear(i)) {
      localDays++;
    }
  }

  return localDays;
};

export default function handler(req, res) {
  const { start, end } = req.query;

  if (start && end && start !== "undefined" && end !== "undefined") {
    const startArray = start.split(".");
    const endArray = end.split(".");

    const startDate = {
      year: parseInt(startArray[2]),
      month: parseInt(startArray[1]),
      day: parseInt(startArray[0]),
    };

    const endDate = {
      day: parseInt(endArray[0]),
      month: parseInt(endArray[1]),
      year: parseInt(endArray[2]),
    };

    //We simply find all days leading up to each date, and subtract them from one another
    const totalDays = countDays(endDate) - countDays(startDate);

    res.status(200).json(totalDays);
  } else {
    res.status(400).json({ message: "Start or end parameter missing" });
  }
}
