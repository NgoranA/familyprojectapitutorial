import { Router } from "express";
import pool from "../config/dbconfig.js";
import validateFamilyData from "../utils/dataValidation.js";
import validateParams from "../utils/validateParams.js";

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
      } else {
        res.json(result.rows);
      }
    });
  } catch (error) {
    next(error);
  }
});

/* Get member by id*/

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  try {
    validateParams(+id);
    pool.query(`select * from family_tree where id=$1`, [id], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.rowCount === 1) {
        res.json(result.rows[0]);
      } else {
        const err = new Error("Element does not exist");
        err.status = 404;
        throw err;
      }
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
      "select id from family_tree where email=$1",
      [email],
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result.rows.length);
        if (result.rows.length === 0) {
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
        } else {
          const err = new Error(
            `Family Member with email : ${email} already exists`,
          );
          err.status = 409;
          next(err);
        }
      },
    );
  } catch (error) {
    next(error);
  }
});

/* delete family member */

router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  try {
    validateParams(+id);
    pool.query(`select * from family_tree where id=$1`, [id], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.rowCount === 1) {
        pool.query(
          "delete from family_tree where id=$1",
          [result.rows[0].id],
          (err) => {
            if (err) {
              throw err;
            }
            res.status(204).json({ message: "family member deleted" });
          },
        );
      } else {
        const err = new Error("Element does not exist");
        err.status = 404;
        throw err;
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
