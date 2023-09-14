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

const getBill = (req, res) => {
    const orderDetails = req.body;
    const pdfPath = path.join( __dirname, `../generated_pdf/${orderDetails.uuid}.pdf`);
    if (fs.existsSync(pdfPath)){
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    }else{
        console.log(`file not there.`);
        let generatedUuid = uuid.v1();
        let productDetailsReport = JSON.parse(orderDetails.productDetails);
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
                                res.contentType("application/pdf");
                                fs.createReadStream(path.join( __dirname, `../generated_pdf/${generatedUuid}.pdf` )).pipe(res);
                            }
                        }
                    )
                }
            }
        )
    }
}

const getAll = (req, res) => {
    let query = "select * from bill order by id desc";
    db.conn.query(
        query,
        [],
        (err, results)=>{
            if (err){
                return res.status(500).json(err);
            }else{
                return res.status(200).json({
                    message: "get all bills success.",
                    payload: results
                })
            }
        }
    )
}

const deleteOne = (req, res) => {
    let bill = req.body; //{id, uuid}
    let query = "DELETE FROM bill where id=?"
    db.conn.query(
        query,
        [bill.id],
        (err, result) => {
            if (err){
                return res.status(500).json(err)
            }else{
                if (result.affectedRows<=0){
                    return res.status(400).json({
                        message: "bill not found."
                    })
                }else{
                    try{
                        fs.unlinkSync(path.join(__dirname, `../generated_pdf/${bill.uuid}.pdf`))
                    }catch(error){
                        console.log(error.message);
                    }
                    return res.status(200).json({
                        message: "bill deleted successfully."
                    })
                }
            }
        }
    )
}

const billCtrl = {
    generateDetails,
    getBill,
    getAll,
    deleteOne
}

module.exports = billCtrl;