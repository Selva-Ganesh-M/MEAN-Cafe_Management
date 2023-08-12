const express = require("express");
const ENV = require("./config/ENV");
const db = require("./config/dbConn");
const cors = require("cors");
const userRouter = require("./routers/user.router");

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cors())

// #region : routers
server.use("/api/users", userRouter)

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