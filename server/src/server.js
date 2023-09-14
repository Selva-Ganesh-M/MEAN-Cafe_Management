const express = require("express");
const ENV = require("./config/ENV");
const db = require("./config/dbConn");
const cors = require("cors");
const userRouter = require("./routers/user.router");
const categoryRouter = require("./routers/category.router");
const productRouter = require("./routers/product.router");
const billRouter = require("./routers/bill.router");

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cors())

// #region : routers
server.use((req, res, next)=>{
    console.log(`${req.method} ${req.path}`);
    next()
})
server.use("/api/users", userRouter);
server.use("/api/category", categoryRouter);
server.use("/api/product", productRouter);
server.use("/api/bill", billRouter);



// #endregion : routers

const startServer = () => {
    try {
        db.connectToDb()
        server.listen(ENV.PORT, () => {
            console.log(`server started listening at ${ENV.PORT}`);
        })

    } catch (error) {
        console.log(err.message);
    }
}

startServer()