const { JWT_SECRET } = require("../config/ENV");
const db = require("../config/dbConn");
const jwt = require("jsonwebtoken");
const { mailTransporter } = require("../utils/mailerTransporter");
const ENV = require("../config/ENV");

const signup = (req, res) => {
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
}

const login = (req, res) => {
    let user = req.body;
    let query = "select * from user where email=?"
    db.conn.query(query, [user.email], (err, response) => {
        console.log(response[0]);
        if (!err) {
            if (!response[0]) {
                return res.status(400).json({
                    message: "user not found"
                })
            } else if (response[0].status == "false") {
                return res.status(401).json({
                    message: "wait for admin permission."
                })
            } else if (response[0].password == user.password) {
                let content = { email: user.email, role: response[0].role, status: response[0].status }
                token = jwt.sign(content, JWT_SECRET, { expiresIn: "8h" })
                return res.status(200).json({
                    token
                })
            } else {
                return res.status(500).json({
                    message: "Something went wrong."
                })
            }
        } else {
            return res.status(500).json({ message: err.message })
        }
    })
}

const forgotPassword = (req, res)=>{
    let user = req.body;
    if (!user){
        return res.status(400).json({
            message: "user details missing."
        })
    }
    const query = "SELECT email, password from user where email=?";
    db.conn.query(query, [user.email], (err, result)=>{
        if (!err){
            if (result.length<=0){
                return result.status(200).json({message: "Your password is sent to your mail."})
            }else {
                let mailOptions = {
                    from: ENV.MAILER_USER,
                    to: user.email,
                    subject: "Password by Cafe management system",
                    html:`<p>Password: ${result[0].password}</p>`
                }
                mailTransporter.sendMail(mailOptions, (err, info)=>{
                    if (!err){
                        console.log(`Email sent: ${info.resultponse}`);
                    }else{
                        console.log(err.message);
                    }
                })
                return res.status(200).json({message: "Your password is sent to your mail."})
            }
        }else {
            return res.status(500).json(err);
        }
    })
}

let getAllUsers = (req, res) => {
    const query = "SELECT * FROM user where role='user'"
    db.conn.query(query, [], (err, results) => {
        if (!err) {
            return res.status(200).json({
                message: "got all users",
                payload: results
            })
        } else {
            return res.status(500).json({
                message: err.message
            })
        }
    })
}

let updateStatus = (req, res)=>{
    let query = "UPDATE user SET status=? where id=?";
    db.conn.query(query, [req.body.status, req.body.id], (err, result)=>{
        if (err){
            // error
            return res.status(500).json({message: error.message});
        }else{
            // no error
            if(result.affectedRows==0){
                return res.status(400).json({
                    message: "userid doesn't exist."
                })
            }else{
                return res.status(200).json({
                    message: "user updated successfully."
                });
            }
        }
    })
}

let checkToken = (req, res)=>{
    return res.status(200).json({
        message: "True",
    })
}

let changePassword = (req, res) => {
    let user = req.body;
    if(!user){
        return res.status(400).json({
            message: "user details is missing in the request body."
        })
    }
    let query = "SELECT * FROM user where email=?"
    db.conn.query(query, [user.email], (err, response)=>{
        if (err){
            return res.status(400).json({
                message: err.message
            })
        }else{
            let obtUser = response[0];
            if (obtUser){
                if (user.oldPassword==obtUser.password){
                    query = "UPDATE user SET password=? where email=?";
                    db.conn.query(query, [user.newPassword, res.locals.email], (err, response)=>{
                        if (err){
                            res.status(500).json({
                                message: err.message
                            })
                        }else if(response.affectedRows==1){
                            res.status(200).json({
                                message: "password updated successfully."
                            })
                        }else{
                            res.status(500).json({
                                message: "something went wrong."
                            })
                        }
                    })
                }else{
                    return res.status(403).json({
                        message: "password mismatch found."
                    });
                }
            }else{
                return res.status(400).json({
                    message: "user doesn't exist."
                })
            }
        }
    })
}

let userCtrl = {
    signup,
    login,
    forgotPassword,
    getAllUsers,
    updateStatus,
    checkToken,
    changePassword
}
module.exports = userCtrl;