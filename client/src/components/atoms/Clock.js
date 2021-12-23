import React, { useState, useCallback, useEffect } from "react";
import { Typography } from "antd";

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [mounted, setMounted] = useState(true);

  const clock = useCallback(() => {
    setInterval(() => setTime(new Date().toLocaleTimeString(), 500));
  }, []);

  useEffect(() => {
    if (mounted) {
      clock();
    }
    return () => setMounted(false);
  }, [mounted, clock]);

  return (
    <Typography.Title level={2} style={{ textAlign: "center" }}>
      {time}
    </Typography.Title>
  );
};

export default Clock;
