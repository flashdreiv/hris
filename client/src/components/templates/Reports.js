import React from "react";
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
  const reportsSummary = useStore((state) => state.reportsSummary);

  const parseValues = (data) => {
    const rangePicker = data && data["rangePicker"];
    return {
      dateFrom: rangePicker[0]?.format("YYYY-MM-DD"),
      dateTo: rangePicker[1]?.format("YYYY-MM-DD"),
    };
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedObj = parseValues(values);
        const { dateFrom, dateTo } = formattedObj;

        getReportsSummary(dateFrom, dateTo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const dateNow = moment(new Date());
  const initialValues = {
    rangePicker: [
      moment(new Date("2021-12-01")),
      moment(new Date("2021-12-31")),
    ],
  };

  return (
    <div>
      {console.log(timelogReportsColumn)}
      <Title level={5}>Select Date Range</Title>
      <ReportForm
        form={form}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
      />
      <Table
        size="small"
        columns={timelogReportsColumn}
        rowKey={(r) => r._id}
        dataSource={reportsSummary && reportsSummary.timelogs}
      />
      <ReportStatistics
        values={reportsSummary?.timelogs?.length > 0 && reportsSummary}
      />
    </div>
  );
};

export default Reports;
