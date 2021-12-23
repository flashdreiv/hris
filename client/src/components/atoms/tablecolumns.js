import { Tag, Space, Button, Popconfirm } from "antd";
import moment from "moment";

const returnDate = (date) => {
  return date && new Date(date);
};

const checkDate = (date) => {
  if (date === "Invalid Date") {
    return "None";
  }
  return date ? date : "None";
};

const timelogColumn = [
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

const timelogCorrectionColumn = (
  setModal,
  setSelectedTLC,
  deleteCorrection
) => [
  {
    title: "Created",
    dataIndex: "createdAt",
    key: "createdAt",
    defaultSortOrder: "descend",
    render: (createdAt) => {
      return createdAt ? returnDate(createdAt).toLocaleDateString() : "None";
    },
  },
  {
    title: "Timelog",
    dataIndex: "timelog",
    key: "timelog",
    defaultSortOrder: "descend",
    render: (timelog) => {
      return timelog
        ? returnDate(timelog.createdAt).toLocaleDateString()
        : "None";
    },
  },
  {
    title: "Time-In",
    dataIndex: "newTimeIn",
    key: "newTimeIn",
    render: (newTimeIn) =>
      newTimeIn
        ? checkDate(
            returnDate(newTimeIn).toLocaleTimeString([], { timeStyle: "short" })
          )
        : "None",
  },
  {
    title: "Time-Out",
    key: "newTimeOut",
    dataIndex: "newTimeOut",
    render: (newTimeOut) =>
      newTimeOut
        ? checkDate(
            returnDate(newTimeOut).toLocaleTimeString([], {
              timeStyle: "short",
            })
          )
        : "None",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status) => {
      switch (status) {
        case "Approved":
          return <Tag color="green">{status}</Tag>;
        case "Rejected":
          return <Tag color="red">{status}</Tag>;
        default:
          return <Tag color="geekblue">{status}</Tag>;
      }
    },
  },
  {
    title: "Approver",
    key: "approver",
    dataIndex: "approver",
    render: (approver) => (approver ? approver.name : "None"),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button
          type="link"
          size="small"
          onClick={() => {
            const formattedObj = {
              timelog: record.createdAt && moment(record.createdAt),
              timeIn: record.newTimeIn && moment(record.newTimeIn),
              timeOut: record.newTimeOut && moment(record.newTimeOut),
              approver: record.approver.name,
            };
            setSelectedTLC(formattedObj);
            setModal({ type: "edit", open: true });
          }}
        >
          Edit
        </Button>
        <Popconfirm
          title="Are you sure you want to delete this correction?"
          onConfirm={() => deleteCorrection(record._id)}
        >
          <Button type="link"> Delete</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

export { timelogColumn, timelogCorrectionColumn };
