const db = require("../config/dbConn");

const createProduct = (req, res)=>{
    let product = req.body;
    let query = "INSERT INTO product(name, categoryId, description, price, status) VALUES (?,?,?,?,'true')";
    db.conn.query(query, [product.name, product.categoryId, product.description, product.price, product.status], (err, response)=>{
        if (err){
            return res.status(500).json(err);
        }else{
            return res.status(201).json({
                message: "new product created."
            })
        }
    });

}

const getAllProducts = (req, res)=>{
    let query = "SELECT p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p left join category as c on p.categoryId = c.id"
    db.conn.query(query, [], (err, response)=>{
        if (err){
            return res.status(500).json(err);
        }else{
            return res.status(200).json({
                message: "get all products success.",
                payload: response
            })
        }
    })
}

const getByCategory = (req, res)=>{
    let query = "SELECT * from product as p where p.categoryId = ?"
    db.conn.query(query, [req.params.categoryId], (err, response)=>{
        if (err){
            return res.status(500).json(err);
        }else {
            return res.status(200).json({
                message: "get prod by cat success",
                payload: response
            })
        }
    })
}

let productCtrl = {
    createProduct,
    getAllProducts,
    getByCategory
}
module.exports = productCtrl