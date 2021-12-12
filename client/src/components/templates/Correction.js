import React, { useEffect } from "react";
import CorrectionForm from "../molecules/CorrectionForm";
import { Table } from "antd";
import columns from "../atoms/tablecolumns";
import useStore from "../../store";

const Correction = () => {
  const getUsers = useStore((state) => state.getUsers);
  const users = useStore((state) => state.users);
  const addTimelogCorrection = useStore((state) => state.addTimelogCorrection);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const parseSubmission = (data) => {
    const timelog = data["timelog"].format("YYYY-MM-DD");
    return {
      timelog: timelog,
      newTimeIn: data["timeIn"].format(`${timelog} HH:mm:ss`),
      newTimeOut: data["timeOut"].format(`${timelog} HH:mm:ss`),
      approver: data["approver"],
    };
  };

  const handleSubmit = (data) => {
    addTimelogCorrection(parseSubmission(data));
  };

  return (
    <React.Fragment>
      <CorrectionForm
        approvers={Object.values(users)}
        onSubmit={handleSubmit}
      />
      <Table columns={columns} />
    </React.Fragment>
  );
};

export default Correction;
