import React, { useState } from "react";
import { Form, Button, DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const ReportForm = ({ form, handleSubmit }) => {
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [value, setValue] = useState();

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([]);
      setDates([]);
      form.setFieldsValue({ rangePicker: [null, null] });
    } else {
      setHackValue(undefined);
    }
  };
  const disabledDate = (current) => {
    if (!dates || dates.length === 0) return false;
    const tooLate = dates[0] && current.diff(dates[0], "days") > 14;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 14;
    return tooEarly || tooLate;
  };
  return (
    <Form
      layout="inline"
      form={form}
      name="report-form"
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
        <RangePicker
          style={{ marginBottom: "10px" }}
          value={hackValue || value}
          disabledDate={disabledDate}
          onCalendarChange={(val) => setDates(val)}
          onChange={(val) => setValue(val)}
          onOpenChange={onOpenChange}
          ranges={{
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
        />
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
