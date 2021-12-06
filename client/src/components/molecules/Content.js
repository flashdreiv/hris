import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Layout, Table, Tag, Card, Typography, Button } from "antd";

const { Content } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a href="/">{text}</a>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "age",
  },
  {
    title: "Time-In",
    dataIndex: "timeIn",
    key: "address",
  },
  {
    title: "Time-Out",
    key: "timeOut",
    dataIndex: "timeOut",
  },
  {
    title: "Status",
    dataIndex: "tags",
    key: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = "volcano";
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    date: new Date().toLocaleDateString(),
    timeIn: "New York No. 1 Lake Park",
    tags: ["LTI", "ABS"],
  },
  {
    key: "2",
    name: "Jim Green",
    date: new Date().toLocaleDateString(),
    timeIn: "London No. 1 Lake Park",
    tags: ["OT"],
  },
  {
    key: "3",
    name: "Joe Black",
    date: new Date().toLocaleDateString(),
    timeIn: "Sidney No. 1 Lake Park",
    tags: ["OT", "LTI"],
  },
];
const ContentSection = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setInterval(() => setTime(new Date().toLocaleTimeString(), 500));
  }, [time]);

  return (
    <React.Fragment>
      <Layout className="site-layout-background" style={{ margin: "25px" }}>
        <Sidebar />
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Card style={{ width: 250 }}>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
              {time}
            </Typography.Title>
            <Button type="primary" style={{ marginLeft: "50px" }}>
              Time-in
            </Button>
          </Card>
          <br />
          <Table columns={columns} dataSource={data} />
        </Content>
      </Layout>
    </React.Fragment>
  );
};

export default ContentSection;
