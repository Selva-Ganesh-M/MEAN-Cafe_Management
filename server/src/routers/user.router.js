const express = require("express");
const db = require("../config/dbConn");
const router = express.Router()
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/ENV");
const userCtrl = require("../controllers/user.ctrl");

router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.post("/forgotPassword", userCtrl.forgotPassword)
router.get("/getAllUsers", userCtrl.getAllUsers);
router.patch("/updateStatus", userCtrl.updateStatus);

let userRouter = router
module.exports = userRouter