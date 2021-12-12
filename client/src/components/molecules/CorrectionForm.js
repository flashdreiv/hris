import React from "react";
import { Form, Select, Input, Button, DatePicker, TimePicker } from "antd";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 13,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CorrectionForm = ({ approvers, onSubmit }) => {
  const renderApprovers = () =>
    approvers.map((approver) => (
      <Option value={approver._id} key={approver._id}>
        {approver.email}
      </Option>
    ));
  return (
    <Form {...layout} name="control-ref" onFinish={onSubmit}>
      <Form.Item
        name="timelog"
        label="Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item name="timeIn" label="Time-In">
        <TimePicker use12Hours format="h:mm a" />
      </Form.Item>
      <Form.Item name="timeOut" label="Time-Out">
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
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("approver") === "other" ? (
            <Form.Item
              name="customizeApprover"
              label="Customize Approver"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "10px" }}
        >
          Submit
        </Button>
        <Button htmlType="button">Reset</Button>
      </Form.Item>
    </Form>
  );
};

export default CorrectionForm;
