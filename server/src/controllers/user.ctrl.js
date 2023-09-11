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
        console.log(response);
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

let userCtrl = {
    signup, login
}
module.exports = userCtrl;