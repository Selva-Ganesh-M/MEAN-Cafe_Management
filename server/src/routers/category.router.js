const express = require("express");
const categoryCtrl = require("../controllers/category.ctrl");
const authorization = require("../middlewares/authorization.mw");
const adminCheck = require("../middlewares/adminCheck.mw");

const router = express.Router();
router.get("/getAll", authorization, adminCheck, categoryCtrl.getAllCategories);
router.post("/create", authorization, adminCheck, categoryCtrl.createCategory);
router.patch("/update", authorization, adminCheck, categoryCtrl.updateCategory);
router.delete("/delete", authorization, adminCheck, categoryCtrl.deleteCategory);

let categoryRouter = router;
module.exports = categoryRouter;