const db = require("../config/dbConn");

let getAllCategories = (req, res) => {
    let query = "SELECT * FROM category";
    db.conn.query(query, [], (err, response)=>{
        if (err){
            return res.status(500).json(err);
        }else{
            return res.status(200).json({
                message: "get all categories success.",
                payload: response
            })
        }
    })
}

let createCategory = (req, res) => {
    let category = req.body;
    if (!category){ return res.status(500).json({message: "category name is mandatory"})}
    let query = "INSERT INTO category(name) VALUES(?)";
    db.conn.query(query, [category.name], (err, response)=>{
        if (err){
            return res.status(500).json(err);
        }else{
            if (response.affectedRows==1){
                return res.status(201).json({
                    message: "new category created."
                })
            }else{
                return res.status(500).json({
                    message: "something went wrong."
                })
            }
        }
    })
}

let updateCategory = (req, res)=>{
    let category = req.body; //{id, newName}
    if (!category){ return res.status(500).json({message: "category name is mandatory"})}
    let query = "UPDATE category SET name=? where id=?";
    db.conn.query(query, [category.newName, category.id], (err, response)=>{
        if (err){
            return res.status(500).json(err);
        }else{
            if (response.affectedRows==1){
                return res.status(201).json({
                    message: "category updated."
                })
            }else{
                return res.status(500).json({
                    message: "category not found."
                })
            }
        }
    })
}

let deleteCategory = (req, res)=>{
    let category = req.body; //{id}
    if (!category){ return res.status(500).json({message: "category id is mandatory"})}
    let query = "DELETE FROM category where id=?";
    db.conn.query(query, [category.id], (err, response)=>{
        if (err){
            return res.status(500).json(err);
        }else{
            if (response.affectedRows==1){
                return res.status(201).json({
                    message: "category deleted."
                })
            }else{
                return res.status(500).json({
                    message: "category not found."
                })
            }
        }
    })
}

let categoryCtrl = {
    createCategory,
    updateCategory,
    getAllCategories,
    deleteCategory
}

module.exports = categoryCtrl;