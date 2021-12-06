import React from "react";
import { Layout } from "antd";
import HeaderSection from "../../components/molecules/Header";
import ContentSection from "../../components/molecules/Content";
import FooterSection from "../../components/molecules/Footer";
import "../../styles/Home.css";

const Home = () => {
  return (
    <>
      <Layout>
        <HeaderSection />
        <ContentSection />
        <FooterSection />
      </Layout>
    </>
  );
};

export default Home;
