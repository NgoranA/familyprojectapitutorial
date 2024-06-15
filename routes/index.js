import { Router } from "express";
import pool from "../config/dbconfig.js";
import validateFamilyData from "../utils/dataValidation.js";

const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let familyMembers = [];
  pool
    .query("select * from family_tree;")
    .then((family) => {
      familyMembers = family;
    })
    .catch((err) => {
      next(err);
    });
  if (familyMembers.length === 0) {
    res.json({ message: "There's no family member in the database" });
  }
  res.json(familyMembers);
});

/* Create family members */
router.post("/", function (req, res, next) {
  next(validateFamilyData(req.body));
  res.send(req.body);
});

export default router;
