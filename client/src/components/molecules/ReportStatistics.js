import React from "react";
import { Statistic, Row, Col, Card } from "antd";

const ReportStatistics = ({ values }) => {
  return (
    <Row gutter={16} style={{ marginTop: "10px" }}>
      <Col span={8}>
        <Card>
          <Statistic
            title="Total Absent"
            value={values.total_absent}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Total Late"
            value={values.total_late}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Total Hours"
            value={values.total_hours}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default ReportStatistics;
