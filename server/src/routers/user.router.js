const express = require("express");
const db = require("../config/dbConn");
const router = express.Router()
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/ENV");
const userCtrl = require("../controllers/user.ctrl");
const authorization = require("../middlewares/authorization.mw");
const adminCheck = require("../middlewares/adminCheck.mw");

router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.post("/forgotPassword", userCtrl.forgotPassword)
router.get("/getAllUsers", authorization, adminCheck, userCtrl.getAllUsers);
router.patch("/updateStatus", authorization, adminCheck, userCtrl.updateStatus);
router.patch("/changePassword", authorization, userCtrl.changePassword);
router.get('checkToken', authorization, userCtrl.checkToken);


let userRouter = router
module.exports = userRouter