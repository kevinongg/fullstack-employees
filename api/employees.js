import {
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";
import express from "express";
const router = express.Router();
export default router;

import { createEmployee } from "#db/queries/employees";

// TODO: this file!
router.route("/").get(async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.route("/").post(async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is not provided");
  }
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    return res.status(400).send("Request body is missing required field");
  }
  const employee = await createEmployee({ name, birthday, salary });
  return res.status(201).send(employee);
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const numId = Number(id);
  if (!/^\d+$/.test(id) || numId < 0) {
    return res.status(400).send("ID must be a positive integer or cannot be 0");
  }
  const employee = await getEmployee(numId);
  if (!employee) {
    return res.status(404).send("Employee does not exist");
  }
  return res.send(employee);
});

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const numId = Number(id);
  if (!/^\d+$/.test(id) || numId < 0) {
    return res.status(400).send("ID must be a positive integer or cannot be 0");
  }
  const employee = await getEmployee(numId);
  if (!employee) {
    return res.status(404).send("Employee does not exist");
  }
  const remove = await deleteEmployee(numId);
  return res.status(204).send(remove);
});

router.route("/:id").put(async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is not provided");
  }
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    return res.status(400).send("Request body is missing a required field");
  }

  const { id } = req.params;
  const numId = Number(id);
  if (!/^\d+$/.test(id) || numId < 0) {
    return res.status(400).send("ID must be a positive integer or cannot be 0");
  }

  const employee = await getEmployee(numId);
  if (!employee) {
    return res.status(404).send("Employee does not exist");
  }
  const updated = await updateEmployee({ id, name, birthday, salary });
  return res.status(200).send(updated);
});
