import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Sidebar from "./Sidebar";
import ClockIn from "../templates/ClockIn";
import Correction from "../templates/Correction";
import { Layout } from "antd";

const { Content } = Layout;

const ContentSection = () => {
  return (
    <Layout className="site-layout-background" style={{ margin: "25px" }}>
      <Sidebar />{" "}
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ClockIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/correction"
            element={
              <ProtectedRoute>
                <Correction />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Content>
    </Layout>
  );
};

export default ContentSection;
