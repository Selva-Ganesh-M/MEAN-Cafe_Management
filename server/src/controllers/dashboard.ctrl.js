const db = require("../config/dbConn")

const details = (req, res) => {
    let categoryCount, productCount, billCount;
    let query = "select count(*) as categoryCount from category";
    db.conn.query(
        query,
        [],
        (err, result)=>{
            if (err){
                return res.status(500).json(err);
            }else{
                console.log(result[0].categoryCount);
                categoryCount = result[0].categoryCount
                console.log(categoryCount);
            }
        }
    )
    query = "select count(*) as productCount from product";
    db.conn.query(
        query,
        [],
        (err, result)=>{
            if (err){
                return res.status(500).json(err);
            }else{
                productCount = result[0].productCount;
            }
        }
    )
    query = "select count(*) as billCount from bill";
    db.conn.query(
        query,
        [],
        (err, result)=>{
            if (err){
                return res.status(500).json(err);
            }else{
                billCount = result[0].billCount
            }
        }
    )

    console.log(billCount, categoryCount, productCount);
    console.log({
        billCount, categoryCount, productCount
    });
    return res.status(200).json({
        message: "get details success",
        payload: {
            billCount, categoryCount, productCount
        }
    })
}

let dashboardCtrl = {
    details
}
module.exports = dashboardCtrl;