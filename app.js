import express from "express";
const app = express();
export default app;
import employeeRoutes from "./api/employees.js";

// TODO: this file!
app.use(express.json());

app.use("/employees", employeeRoutes);

app.route("/").get((req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong!");
});
