import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TimelogCorrectionSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
  newTimeIn: {
    type: Date,
  },
  newTimeOut: {
    type: Date,
  },
  approver: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const TimelogCorrection = mongoose.model(
  "timelogcorrections",
  TimelogCorrectionSchema
);

export default TimelogCorrection;
