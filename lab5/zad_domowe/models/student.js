import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  faculty: { type: String, required: true }
});

const Student = mongoose.model("students", studentSchema); //schema z db | nasze w API

export { Student };
