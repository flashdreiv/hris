import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Layout, Table, Card } from "antd";
import Clock from "../atoms/Clock";
import TimeActionButton from "../atoms/TimeActionButton";
import columns from "../atoms/tablecolumns";
import useStore from "../../store";

const { Content } = Layout;
//STILL HAVE A BUG ON TIME OUT WHEN REFRESHED

const ContentSection = () => {
  const timelogs = useStore((state) => state.timelogs);
  const fetchTimelogs = useStore((state) => state.fetchTimelogs);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    fetchTimelogs(pageNum);
  }, [fetchTimelogs, pageNum]);

  return (
    <React.Fragment>
      <Layout className="site-layout-background" style={{ margin: "25px" }}>
        <Sidebar />
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Card style={{ width: 250 }}>
            <Clock />
            <TimeActionButton />
          </Card>
          <br />
          <Table
            columns={columns}
            rowKey={(r) => r._id}
            size="small"
            dataSource={timelogs?.data && Object.values(timelogs.data)}
            pagination={timelogs && timelogs.pagination}
            onChange={(data) => setPageNum(data.current)}
          />
        </Content>
      </Layout>
    </React.Fragment>
  );
};

export default ContentSection;
