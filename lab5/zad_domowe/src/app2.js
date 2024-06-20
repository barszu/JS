/**
 * @author Stanisław Polak <polak@agh.edu.pl>
 */

import express, { response } from "express";
import morgan from "morgan";
import qs from "node:querystring";

const students = [
  {
    fname: "Jan",
    lname: "Kowalski",
  },
  {
    fname: "Anna",
    lname: "Nowak",
  },
];

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();

app.locals.pretty = app.get("env") === "development"; // The resulting HTML code will be indented in the development environment

/* ************************************************ */

app.use(morgan("dev"));

// dodalem alias na widoki, i konfiguracje silnika wyswietlania
app.set("views", "./views");
app.set("view engine", "pug");

/* ******** */
/* "Routes" */
/* ******** */

/* ------------- */
/* Route 'GET /' */
/* ------------- */
app.use("/static", express.static("public"));

app.get("/", (request, response) => {
  response.render("index", { students }); // Render the 'index' view
});

app.get("/submit", (request, response) => {
  const name = request.query.name || "Unknown";
  response.send(`Hello ${name}`);
});

// app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parser ciala

app.post("/", (req, res) => {
  const name = req.body.name || "Unknown"; // Ustawienie nazwy, jeśli nie została przesłana
  console.log("name: ", req.body);
  const responseMessage = `Hello ${name}`;
  res.status(200).send(responseMessage);
});

/* ************************************************ */

app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});
