import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TimelogCorrectionSchema = mongoose.Schema({
  timelog: {
    type: Schema.Types.ObjectId,
    ref: "timelogs",
    required: true,
  },
  oldTimeIn: {
    type: Date,
  },
  oldTimeOut: {
    type: Date,
  },
  approver: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: Boolean,
  },
});

const TimelogCorrection = mongoose.connect(
  "timelogcorrections",
  TimelogCorrectionSchema
);

export default TimelogCorrection;
