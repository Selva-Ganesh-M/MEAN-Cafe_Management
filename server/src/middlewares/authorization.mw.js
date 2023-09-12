const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/ENV");

const authorization = (req, res, next)=>{
    let authHeader = req.headers['authorization'];
    let token = authHeader;
    console.log(token);
    if (!token) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, response)=>{
        if (err) {
            return res.status(403).json({message: err.message});
        }else{
            console.log(response);
            res.locals = response;
            next();
        }
    })
}

module.exports = authorization;