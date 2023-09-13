const express = require("express");
const db = require("../config/dbConn");
const productCtrl = require("../controllers/product.ctrl");
const authorization = require("../middlewares/authorization.mw");
const adminCheck = require("../middlewares/adminCheck.mw");

const router = express.Router();

router.post("/add", authorization, adminCheck, productCtrl.createProduct)

router.get("/getAll", authorization, productCtrl.getAllProducts)

router.get("/getByCat/:categoryId", authorization, productCtrl.getByCategory)

router.get("/getById/:id", authorization, productCtrl.getById);

router.patch("/update/:id", authorization, adminCheck, productCtrl.update);

router.delete("/deleteProduct/:id", authorization, adminCheck, productCtrl.deleteProduct);

let productRouter = router;
module.exports = productRouter