import { Router } from "express";
import pool from "../config/dbconfig.js";
import validateFamilyData from "../utils/dataValidation.js";

const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    pool.query("select * from family_tree;", (err, result) => {
      if (err) {
        throw err;
      }
      if (result.rows.length < 1) {
        res.json({ message: "There are no family members in the database" });
      }
      res.json(result.rows);
    });
  } catch (error) {
    next(error);
  }
});

/* Create family members */
router.post("/", function (req, res, next) {
  try {
    validateFamilyData(req.body);
    const { name, age, email, sex, job_title, salary, address } = req.body;
    pool.query(
      "INSERT INTO family_tree (name, email, age, sex, job_title, salary, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, email, age, sex, job_title, salary, address],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(201).json(results);
      },
    );
  } catch (error) {
    next(error);
  }
});

export default router;
