import React, { useEffect, useState } from "react";
import CorrectionForm from "../molecules/CorrectionForm";
import { Table, Modal, Button, Form, message } from "antd";
import { timelogCorrectionColumn } from "../atoms/tablecolumns";
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
      timelog: timelog,
      newTimeIn: data["timeIn"]?.format(`${timelog} HH:mm:ss`) ?? undefined,
      newTimeOut: data["timeOut"]?.format(`${timelog} HH:mm:ss`) ?? undefined,
      approver: data["approver"],
    };
  };

  const handleSubmit = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        modal.type === "add"
          ? addTimelogCorrection(parseSubmission(values))
          : updateTimelogCorrection(values);
        form.resetFields();
      })
      .catch(() => {
        message.error("Unable to save that one");
      });
    setConfirmLoading(false);
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
      <Modal
        title="Timelog Correction"
        visible={modal.open}
        onOk={handleSubmit}
        okText="Submit"
        confirmLoading={confirmLoading}
        onCancel={() => setModal({ type: "add", open: false })}
        forceRender
      >
        <CorrectionForm approvers={Object.values(users)} form={form} />
      </Modal>
    ) : (
      <Modal
        title="Edit Correction"
        visible={modal.open}
        onOk={handleSubmit}
        okText="Save"
        confirmLoading={confirmLoading}
        forceRender
        onCancel={() => setModal({ open: false })}
      >
        <CorrectionForm approvers={Object.values(users)} form={form} />
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <Button
        type="primary"
        onClick={() => setModal({ type: "add", open: true })}
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
