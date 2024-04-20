import express, { request, response } from "express";
import morgan from "morgan";
import mongoose from "mongoose";

import { Student } from "../models/student.js";

// const students = [
//   {
//     firstName: "Jan",
//     lastName: "Kowalski",
//   },
//   {
//     firstName: "Anna",
//     lastName: "Nowak",
//   },
// ];

const app = express();

const urli =
  "mongodb+srv://client:client098Client@database0.nbkysyt.mongodb.net/?retryWrites=true&w=majority&appName=DataBase0/JS_test";

//mongo
mongoose.connect(urli, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("open", () => {
  //TODO
  console.log("connected to db!");
  // const f = async () => {
  //   const students = await Student.find();
  //   console.log(students);
  // };
  // f();
});

app.use(express.json()); //midleware

// app.locals.pretty = app.get("env") === "development"; // The resulting HTML code will be indented in the development environment

// app.use(morgan("dev"));

// dodalem alias na widoki, i konfiguracje silnika wyswietlania
app.set("views", "./views");
app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", async (request, response) => {
  try {
    const students = await Student.find();
    // response.json(students);
    response.render("students", { students }); // Render the 'index' view
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

app.post("/", async (request, response) => {
  const student = new Student({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    faculty: request.body.faculty,
  });
  try {
    const newStudent = await student.save();
    response.status(201).json(newStudent);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

app.get("/:f", async (request, response) => {
  const givenFaculty = request.params.f; //id
  // response.render("index", { students }); // Render the 'index' view
  try {
    const students = await Student.find({faculty: givenFaculty})
    response.render("students", { students });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});



app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});
