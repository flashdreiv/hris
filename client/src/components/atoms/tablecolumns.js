const returnDate = (date) => {
  return new Date(date);
};

const checkDate = (date) => {
  if (date === "Invalid Date") {
    return "None";
  }
  return date;
};

const columns = [
  // {
  //   title: "ID",
  //   dataIndex: "_id",
  //   key: "_id",
  //   render: (id) => id,
  // },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    defaultSortOrder: "descend",
    render: (createdAt) => {
      return returnDate(createdAt).toLocaleDateString();
    },
  },
  {
    title: "Time-In",
    dataIndex: "timeIn",
    key: "timeIn",
    render: (timeIn) =>
      checkDate(
        returnDate(timeIn).toLocaleTimeString([], { timeStyle: "short" })
      ),
  },
  {
    title: "Time-Out",
    key: "timeOut",
    dataIndex: "timeOut",
    render: (timeOut) =>
      checkDate(
        returnDate(timeOut).toLocaleTimeString([], { timeStyle: "short" })
      ),
  },
];

export default columns;
