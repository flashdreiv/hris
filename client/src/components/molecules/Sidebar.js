import React from "react";
import { Menu, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;
const Sidebar = () => {
  return (
    <Sider style={{ background: "#fff" }} width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="Time Attendance">
          <Menu.Item key="1">Clock-In</Menu.Item>
          <Menu.Item key="2">Timelog Correction</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
