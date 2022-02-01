import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TimeLogSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  timeIn: {
    type: Date,
    default: Date.now,
    required: true,
  },
  timeOut: {
    type: Date,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

TimeLogSchema.index({ timeIn: 1, user: 1 }, { unique: true });

const TimeLog = mongoose.model("timelogs", TimeLogSchema);

export default TimeLog;
