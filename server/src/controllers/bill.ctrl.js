const ejs = require("ejs")
const pdf = require("html-pdf")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid")
const db = require("../config/dbConn");

const generateDetails = (req, res)=>{
    const generatedUuid = uuid.v1();
    const orderDetails = req.body;
    let productDetailsReport = JSON.parse(orderDetails.productDetails);

    let query = "INSERT INTO bill(name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) values(?, ?, ?, ?, ?, ?, ?, ?)";

    db.conn.query(
        query, 
        [orderDetails.name, generatedUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.total, orderDetails.productDetails, res.locals.email], 
        (err, results)=>{
        if (err){
            console.log(`got error`);
            return res.status(500).json(err);
        }else{
            ejs.renderFile(
                path.join(__dirname, "..", "templates", "report.ejs"),
                {
                productDetails: productDetailsReport,
                name: orderDetails.name,
                email: orderDetails.email,
                contactNumber: orderDetails.contactNumber,
                paymentMethod: orderDetails.paymentMethod,
                totalAmount: orderDetails.totalAmount
                },
                (err, result)=>{
                    if (err){
                        console.log(`err here.`);
                        console.log(err.message);
                        return res.status(500).json(err);
                    }else{
                        console.log(`else`);
                        pdf.create(result).toFile(
                            path.join( __dirname, `../generated_pdf/${generatedUuid}.pdf` ),
                            (err, data)=>{
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json(err);
                                }else{
                                    return res.status(200).json({
                                        uuid: generatedUuid
                                    });
                                }
                            }
                        )
                    }
                }
            )
        }
    })
}



const billCtrl = {
    generateDetails
}

module.exports = billCtrl;