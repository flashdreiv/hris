import React, { useState } from "react";
import { Typography } from "antd";

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  setInterval(() => setTime(new Date().toLocaleTimeString(), 500));
  return (
    <Typography.Title level={2} style={{ textAlign: "center" }}>
      {time}
    </Typography.Title>
  );
};

export default Clock;
