import { Tag, Space, Button, Popconfirm } from "antd";
import moment from "moment";
import { AttendanceStatusTypes } from "../../utils";

const returnDate = (date) => {
  return date && new Date(date);
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
      returnDate(timeIn).toLocaleTimeString([], { timeStyle: "short" }),
  },
  {
    title: "Time-Out",
    key: "timeOut",
    dataIndex: "timeOut",
    render: (timeOut) =>
      returnDate(timeOut)?.toLocaleTimeString([], { timeStyle: "short" }) ??
      "None",
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
      return returnDate(createdAt)?.toLocaleDateString() ?? "None";
    },
  },
  {
    title: "Timelog",
    dataIndex: "timelog",
    key: "timelog",
    defaultSortOrder: "descend",
    render: (timelog) => {
      return returnDate(timelog?.createdAt)?.toLocaleDateString() ?? "None";
    },
  },
  {
    title: "Time-In",
    dataIndex: "newTimeIn",
    key: "newTimeIn",
    render: (newTimeIn) =>
      returnDate(newTimeIn)?.toLocaleTimeString([], { timeStyle: "short" }) ??
      "None",
  },
  {
    title: "Time-Out",
    key: "newTimeOut",
    dataIndex: "newTimeOut",
    render: (newTimeOut) =>
      returnDate(newTimeOut)?.toLocaleTimeString([], {
        timeStyle: "short",
      }) ?? "None",
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
    render: (approver) => approver?.name ?? "",
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
              id: record._id,
              timelog: record.createdAt && moment(record.createdAt),
              timeIn: record.newTimeIn && moment(record.newTimeIn),
              timeOut: record.newTimeOut && moment(record.newTimeOut),
              approver: record.approver._id,
              remarks: record.remarks,
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
  {
    title: "Remarks",
    key: "remarks",
    dataIndex: "remarks",
    render: (remarks) => <>{remarks && remarks.slice(0, 15) + "..."}</>,
  },
];

const timelogReportsColumn = [
  ...timelogColumn,
  {
    title: "Total Hours",
    key: "hours",
    dataIndex: "hours",
    render: (hours) => <>{hours && hours}</>,
  },
  {
    title: "Overtime/Undertime",
    key: "ot_ut",
    dataIndex: "ot_ut",
    render: (ot_ut) => {
      return ot_ut >= 0 ? (
        <Tag color="green">{ot_ut}</Tag>
      ) : (
        <Tag color="yellow">{Math.abs(ot_ut)}</Tag>
      );
    },
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status) => {
      switch (status) {
        case AttendanceStatusTypes.PT:
          return <Tag color="green">{status}</Tag>;
        case AttendanceStatusTypes.NTO:
          return <Tag color="yellow">{status}</Tag>;
        case AttendanceStatusTypes.LTI:
          return <Tag color="yellow">{status}</Tag>;
        case AttendanceStatusTypes.ABS:
          return <Tag color="red">{status}</Tag>;
        default:
          return <Tag color="green">{status}</Tag>;
      }
    },
  },
];

export { timelogColumn, timelogCorrectionColumn, timelogReportsColumn };
