import React from "react";
import { Menu, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const { SubMenu } = Menu;
const { Sider } = Layout;
const Sidebar = () => {
  const params = useParams();

  return (
    <Sider style={{ background: "#fff" }} width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={params["*"] === "" ? "clock" : params["*"]}
        defaultOpenKeys={["attendance"]}
        style={{ height: "100%" }}
      >
        <SubMenu
          key="attendance"
          icon={<UserOutlined />}
          title="Time Attendance"
        >
          <Menu.Item key="clock">
            <Link to="/">Clock-In</Link>
          </Menu.Item>
          <Menu.Item key="correction">
            <Link to="/correction">Timelog Correction</Link>
          </Menu.Item>
          <Menu.Item key="reports">
            <Link to="/reports">Reports</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
