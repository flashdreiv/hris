import React from "react";
import { Menu, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
          <Menu.Item key="1">
            <Link to="/">Clock-In</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/correction">Timelog Correction</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
