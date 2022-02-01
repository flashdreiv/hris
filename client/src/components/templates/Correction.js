import React, { useEffect, useState } from "react";
import { Table, Button, Form, message } from "antd";
import { timelogCorrectionColumn } from "../atoms/tablecolumns";
import TLCModalForm from "../molecules/TLCModalForm";
import useStore from "../../store";

const Correction = () => {
  const [modal, setModal] = useState({ type: "add", open: false });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const getUsers = useStore((state) => state.getUsers);
  const users = useStore((state) => state.users);
  const addTimelogCorrection = useStore((state) => state.addTimelogCorrection);
  const getTimelogCorrections = useStore(
    (state) => state.getTimelogCorrections
  );
  const updateTimelogCorrection = useStore(
    (state) => state.updateTimelogCorrection
  );
  const deleteTimelogCorrection = useStore(
    (state) => state.deleteTimelogCorrection
  );
  const timelogCorrections = useStore((state) => state.timelogCorrections);
  const status = useStore((state) => state.status);
  const [selectedTLC, setSelectedTLC] = useState({});

  const [form] = Form.useForm();

  useEffect(() => {
    getUsers();
    getTimelogCorrections();
    form.setFieldsValue(selectedTLC);
  }, [getUsers, getTimelogCorrections, selectedTLC, form]);

  const parseSubmission = (data) => {
    const timelog = data["timelog"].format("YYYY-MM-DD");
    return {
      id: modal.type === "add" ? null : selectedTLC.id,
      timelog: timelog,
      newTimeIn: data["timeIn"]?.format(`${timelog} HH:mm:ss`) ?? undefined,
      newTimeOut: data["timeOut"]?.format(`${timelog} HH:mm:ss`) ?? undefined,
      approver: data["approver"],
      remarks: data["remarks"],
    };
  };

  const handleSubmit = (values) => {
    setConfirmLoading(true);
    if (modal.type === "add") {
      const key = "D";
      message.loading({ content: "Loading..", key });
      addTimelogCorrection(parseSubmission(values));
      setConfirmLoading(false);
      message.error({ content: status.message, key, duration: 2 });
    } else {
      updateTimelogCorrection(parseSubmission(values));
      message.success("Timelog correction updated successfully");
    }
    // form
    //   .validateFields()
    //   .then((values) => {})
    //   .catch(() => {
    //     message.error("Unable to save that one");
    //   });
    setModal({ open: false });
  };

  const deleteTLC = (id) => {
    try {
      deleteTimelogCorrection(id);
      message.success("Successfully deleted");
    } catch (err) {
      message.error("Failed to delete timelog");
    }
  };

  const columns = timelogCorrectionColumn(setModal, setSelectedTLC, deleteTLC);

  const renderModal = () => {
    return modal.type === "add" ? (
      <TLCModalForm
        title="Timelog Creation"
        visible={modal.open}
        confirmLoading={confirmLoading}
        onCancel={() => setModal({ type: "add", open: false })}
        form={form}
        approvers={Object.values(users)}
        handleSubmit={handleSubmit}
      />
    ) : (
      <TLCModalForm
        title="Edit Correction"
        visible={modal.open}
        confirmLoading={confirmLoading}
        onCancel={() => setModal({ open: false })}
        form={form}
        approvers={Object.values(users)}
        handleSubmit={handleSubmit}
      />
    );
  };

  return (
    <React.Fragment>
      <Button
        type="primary"
        onClick={() => {
          setModal({ type: "add", open: true });
          form.resetFields();
        }}
        style={{ marginBottom: "10px" }}
      >
        Add new
      </Button>
      {renderModal()}
      <Table
        size="small"
        rowKey={(r) => r._id}
        columns={columns}
        dataSource={timelogCorrections && Object.values(timelogCorrections)}
      />
    </React.Fragment>
  );
};

export default Correction;
