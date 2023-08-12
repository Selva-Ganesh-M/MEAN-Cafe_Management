const express = require("express");
const db = require("../config/dbConn");
const router = express.Router()

router.post("/signup", (req, res) => {
    if (!req.body) return res.status(400).json({ message: "request must have user details" });
    let user = req.body;
    let query = "SELECT * FROM user where email=?"
    db.conn.query(query, [user.email], (err, result) => {
        if (!err) {
            query = "INSERT INTO user(name, contactNumber, email, password, status, role) VALUES(?, ?, ?, ?, 'false', 'user')"
            db.conn.query(query, [user.name, user.contactNumber, user.email, user.password], (err, result) => {
                if (!err) {
                    return res.status(200).json({
                        message: "user registration success",
                        payload: result
                    })
                } else {
                    return res.status(400).json({
                        message: err.message
                    })
                }
            })
        } else {
            return res.status(400).json({
                message: "user email is already registered."
            })
        }
    })
})

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