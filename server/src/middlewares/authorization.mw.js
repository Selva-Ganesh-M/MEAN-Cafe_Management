const jwt = require("jwt");
const { JWT_SECRET } = require("../config/ENV");

const authorization = (req, res, next)=>{
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, response)=>{
        if (err) return res.sendStatus(403);
        res.locals = response;
        next();
    })
}

module.exports = authorization;