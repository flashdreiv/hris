import React from "react";
import { Form, Select, DatePicker, Input, TimePicker } from "antd";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 13,
  },
};

const CorrectionForm = ({ approvers, form, initialValues, handleSubmit }) => {
  const renderApprovers = () =>
    approvers.map((approver) => (
      <Option value={approver._id} key={approver._id}>
        {approver.name}
      </Option>
    ));

  return (
    <Form
      {...layout}
      id="myForm"
      form={form}
      name="form_in_modal"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="timelog"
        label="Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker
          disabledDate={(current) => {
            return new Date() < current;
          }}
        />
      </Form.Item>
      <Form.Item
        name="timeIn"
        label="Time-In"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TimePicker use12Hours format="h:mm a" />
      </Form.Item>
      <Form.Item
        name="timeOut"
        label="Time-Out"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TimePicker use12Hours format="h:mm a" />
      </Form.Item>
      <Form.Item
        name="approver"
        label="Approver"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select Approver">
          {approvers && renderApprovers()}
        </Select>
      </Form.Item>
      <Form.Item
        name="remarks"
        label="Remarks"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

export default CorrectionForm;
