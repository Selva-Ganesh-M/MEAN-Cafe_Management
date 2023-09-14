const express = require("express");
const authorization = require("../middlewares/authorization.mw")
const adminCheck = require("../middlewares/adminCheck.mw")
const dashboardCtrl = require("../controllers/dashboard.ctrl");

const router = express.Router();

router.get("/details", authorization, adminCheck, dashboardCtrl.details);

let dashboardRouter = router;
module.exports = dashboardRouter;