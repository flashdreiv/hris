import React from "react";
import CorrectionForm from "./CorrectionForm";
import { Button, Modal } from "antd";
import moment from "moment";

const initialValues = {
  timelog: moment("2022-01-17"),
  timeIn: moment("1970-01-01 16:00Z"),
  timeOut: moment("1970-01-01 16:00Z"),
  remarks: "Test",
  approver: "61b5c12a702a7a80c660cc69",
};

const TLCModalForm = ({
  title,
  visible,
  confirmLoading,
  onCancel,
  approvers,
  handleSubmit,
  form,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={[
        <Button>Cancel</Button>,
        <Button type="primary" form="myForm" key="submit" htmlType="submit">
          Submit
        </Button>,
      ]}
    >
      <CorrectionForm
        approvers={approvers}
        form={form}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default TLCModalForm;
