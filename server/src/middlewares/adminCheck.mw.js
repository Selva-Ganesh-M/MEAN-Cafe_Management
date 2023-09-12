function adminCheck(req, res, next){
    if (res.locals.role!="admin"){
        return res.sendStatus(401);
    }else{
        next();
    }
}

module.exports = adminCheck;