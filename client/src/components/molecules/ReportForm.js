import React from "react";
import { Form, Button, DatePicker } from "antd";

const { RangePicker } = DatePicker;
const ReportForm = ({ form, initialValues, handleSubmit }) => {
  return (
    <Form
      layout="inline"
      form={form}
      name="report-form"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="rangePicker"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <RangePicker style={{ marginBottom: "10px" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ok
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReportForm;
