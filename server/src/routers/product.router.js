const express = require("express");
const db = require("../config/dbConn");
const productCtrl = require("../controllers/product.ctrl");
const authorization = require("../middlewares/authorization.mw");
const adminCheck = require("../middlewares/adminCheck.mw");

const router = express.Router();

router.post("/add", authorization, adminCheck, productCtrl.createProduct)

router.get("/getAll", authorization, productCtrl.getAllProducts)

router.get("/getByCat/:categoryId", authorization, productCtrl.getByCategory)

let productRouter = router;
module.exports = productRouter