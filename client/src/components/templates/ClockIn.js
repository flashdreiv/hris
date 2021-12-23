import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import TimeActionButton from "../atoms/TimeActionButton";
import Clock from "../atoms/Clock";
import { timelogColumn } from "../atoms/tablecolumns";
import useStore from "../../store";

const ClockIn = () => {
  const timelogs = useStore((state) => state.timelogs);
  const fetchTimelogs = useStore((state) => state.fetchTimelogs);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    fetchTimelogs(pageNum);
  }, [fetchTimelogs, pageNum]);

  return (
    <React.Fragment>
      <Card style={{ width: 250 }}>
        <Clock />
        <TimeActionButton />
      </Card>
      <br />
      <Table
        columns={timelogColumn}
        rowKey={(r) => r._id}
        size="small"
        dataSource={timelogs?.data && Object.values(timelogs.data)}
        pagination={timelogs && timelogs.pagination}
        onChange={(data) => setPageNum(data.current)}
      />
    </React.Fragment>
  );
};

export default ClockIn;
