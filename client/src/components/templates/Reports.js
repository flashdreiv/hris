import React, { useEffect } from "react";
import { Typography, Table, Form } from "antd";
import { timelogReportsColumn } from "../atoms/tablecolumns";
import ReportForm from "../molecules/ReportForm";
import ReportStatistics from "../molecules/ReportStatistics";
import moment from "moment";
import useStore from "../../store";

const { Title } = Typography;

const Reports = () => {
  const [form] = Form.useForm();
  const getReportsSummary = useStore((state) => state.getReportsSummary);

  useEffect(() => {
    getReportsSummary("2021-12-12T13:13", "2021-12-12T13:13");
  }, [getReportsSummary]);

  const parseValues = (data) => {
    const rangePicker = data && data["rangePicker"];
    return {
      fromDate: rangePicker[0]?.format("YYYY-MM-DD"),
      toDate: rangePicker[1]?.format("YYYY-MM-DD"),
    };
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(parseValues(values));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dateNow = moment(new Date());
  const initialValues = {
    rangePicker: [dateNow, dateNow],
    absent: 0,
    late: 0,
    hours: 0,
  };

  return (
    <div>
      <Title level={5}>Select Date Range</Title>
      <ReportForm
        form={form}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
      />
      <Table size="small" columns={timelogReportsColumn} />
      <ReportStatistics values={initialValues} />
    </div>
  );
};

export default Reports;
