function adminCheck(req, res, next){
    if (req.locals.role!="admin"){
        return res.sendStatus(401);
    }
    next();
}