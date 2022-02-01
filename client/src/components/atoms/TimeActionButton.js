import React, { useEffect } from "react";
import { Button } from "antd";
import useStore from "../../store";

const TimeActionButton = () => {
  const timeIn = useStore((state) => state.timeIn);
  const timeOut = useStore((state) => state.timeOut);
  const selectedTimelog = useStore((state) => state.selectedTimelog);
  const timelogCheck = useStore((state) => state.timelogCheck);
  const timelogStatus = useStore((state) => state.timelogStatus);
  const newDate = new Date();

  useEffect(() => {
    timelogCheck(selectedTimelog);
  }, [selectedTimelog, timelogCheck]);

  const handleTimeAction = () => {
    switch (timelogStatus) {
      case "Time-in":
        timeIn();
        break;
      case "Time-out":
        timeOut(newDate);
        break;
      default:
        return;
    }
  };

  return (
    <Button
      type="primary"
      style={{ marginLeft: "50px" }}
      onClick={handleTimeAction}
      disabled={timelogStatus === "Disabled"}
    >
      {timelogStatus}
    </Button>
  );
};

export default TimeActionButton;
