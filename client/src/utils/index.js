const getFromLocalStorage = () => {
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(localStorage.getItem("userInfo"));
  } else {
    return false;
  }
};

const AttendanceStatusTypes = {
  ABS: "ABSENT",
  LTI: "LATE_TIME_IN",
  NTI: "NO_TIME_IN",
  NTO: "NO_TIME_OUT",
  PT: "PRESENT",
};

export { getFromLocalStorage, AttendanceStatusTypes };
