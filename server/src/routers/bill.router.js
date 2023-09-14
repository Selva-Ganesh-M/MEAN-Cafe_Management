const express = require("express")
const billCtrl = require("../controllers/bill.ctrl");
const authorization = require("../middlewares/authorization.mw");
const adminCheck = require("../middlewares/adminCheck.mw");

const router = express.Router();

router.post("/generateDetails", authorization, adminCheck, billCtrl.generateDetails);

router.post("/getBill", authorization, adminCheck, billCtrl.getBill);

let billRouter = router;

module.exports = billRouter;