import {
  endOfDay,
  startOfDay,
  intervalToDuration,
  eachWeekendOfInterval,
} from "date-fns";
import sumBy from "lodash/sumBy.js";

const findExactDate = async (date, Schema) => {
  if (date) {
    const start = startOfDay(new Date(date));
    const end = endOfDay(new Date(date));
    const exactDate = await Schema.findOne({
      createdAt: {
        $gte: start,
        $lt: end,
      },
    });
    return exactDate;
  } else {
    const start = startOfDay(new Date());
    const end = endOfDay(new Date());
    const exactDate = Schema.findOne({
      createdAt: {
        $gte: start,
        $lt: end,
      },
    });

    return exactDate;
  }
};

const getTotalAbsent = (dateFrom, dateTo, numDays) => {
  const dateDifference = intervalToDuration({
    start: dateFrom,
    end: dateTo,
  });
  //Skip weekends
  const weekends = eachWeekendOfInterval({
    start: dateFrom,
    end: dateTo,
  }).length;

  return dateDifference.days - numDays + 1 - weekends;
};

const getTotalHours = (timelogs) => {
  const timeDuration = timelogs.map((timelog) => {
    const start = new Date(timelog.timeIn);

    let duration = intervalToDuration({
      start,
      end: new Date(timelog.timeOut),
    });
    /*
    Calculate breakhours
    Conditions:
    1.Ask logic about breakhours 

    */

    return duration;
  });

  const total_hours = sumBy(timeDuration, "hours");
  const total_minutes = sumBy(timeDuration, "minutes");
  return total_hours + "." + total_minutes;
};

//Time difference in minutes
const getTimeDifference = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return diff;
};

const getTotalLate = (timelogs) => {
  return timelogs.filter((timelog) => {
    const timelogTime = new Date(timelog.timeIn);
    const startTime = new Date(timelog.timeIn);
    startTime.setHours(9);
    startTime.setMinutes(0);
    startTime.setSeconds(0);

    const gracePeriod = 0;
    const timeDifference =
      Math.round(getTimeDifference(timelogTime, startTime)) - gracePeriod;

    return timeDifference > 0; //Adjust this if you have grace period
  }).length;
};

export {
  findExactDate,
  getTotalAbsent,
  getTotalHours,
  getTimeDifference,
  getTotalLate,
};
