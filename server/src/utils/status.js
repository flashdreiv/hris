export const LTI = "LATE_TIME_IN";
export const ABS = "ABSENT";
export const NTO = "NO_TIME_OUT";
export const PRESENT = "PRESENT";

export const checkStatus = (timelog) => {
  const timeIn = timelog.timeIn;
  const timeOut = timelog.timeOut;

  //Check NTO
  if (!timeOut) return NTO;
  if (timeIn.getHours() > 8) return LTI;
  if (!timeOut && !timeIn) return LTI;

  return PRESENT;
};
