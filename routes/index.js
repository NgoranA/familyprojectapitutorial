import { Router } from "express";
import pool from "../config/dbconfig.js";

const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let familyMembers = [];
  pool
    .query("select * from family_tree;")
    .then((family) => (familyMembers = family))
    .catch((err) => console.log(err));
  if (familyMembers.length === 0) {
    res.json({ message: "There's no family member in the database" });
  }
  res.json(familyMembers);
});

export default router;
