import express from "express";
const app = express();
export default app;

// TODO: this file!
app.use((err, req, res, next) => {
  console.error(error);
  res.status(500).send("Sorry! Something went wrong!");
});
