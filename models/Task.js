import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  // _id는 자동으로 생성해준다.
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동생성
  }
);

export const Task = mongoose.model("Task", TaskSchema);
