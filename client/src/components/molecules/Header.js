import React, { useState } from "react";
import { Layout, Typography, Menu, Modal } from "antd";
import useStore from "../../store";
import styled from "styled-components";

const { Header } = Layout;

const MenuItem = styled(Menu.Item)`
  color: #f5222d;
  margin-left: ${(props) => props.end && "auto"};
  &:hover {
    background-color: white;
  }
`;

const StyledHeader = styled(Header)`
  background-color: white;
`;

const Span = styled.span`
  float: left;
  margin: 14px 24px 16px 0;
  text-align: center;
`;

const HeaderSection = () => {
  const signOut = useStore((state) => state.signOut);
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  return (
    <StyledHeader>
      <Span>
        <Typography.Title level={3} style={{ color: "#f5222d" }}>
          Sun*
        </Typography.Title>
      </Span>
      <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
        <MenuItem key="1">Home</MenuItem>
        <MenuItem key="2" onClick={openModal} end>
          Logout
        </MenuItem>
      </Menu>

      <Modal
        title="Logout"
        visible={modal}
        onOk={signOut}
        onCancel={closeModal}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </StyledHeader>
  );
};

export default HeaderSection;
