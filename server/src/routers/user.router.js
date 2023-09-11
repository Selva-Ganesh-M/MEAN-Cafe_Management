const express = require("express");
const db = require("../config/dbConn");
const router = express.Router()
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/ENV");
const userCtrl = require("../controllers/user.ctrl");

router.post("/signup", userCtrl.signup)

router.post("/login", userCtrl.login)

// testing routes

// get all users
router.get("/", (req, res) => {
    const query = "SELECT * FROM user"
    db.conn.query(query, [], (err, results) => {
        if (!err) {
            res.status(200).json({
                message: "got all users",
                payload: results
            })
        } else {
            res.status(500).json({
                message: err.message
            })
        }
    })
})

let userRouter = router
module.exports = userRouter