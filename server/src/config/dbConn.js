const mySql = require("mysql")
const ENV = require("./ENV")

const conn = mySql.createConnection({
    port: ENV.DB_PORT,
    user: ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
    host: ENV.DB_HOST,
    database: ENV.DB_NAME
})

const connectToDb = () => {
    conn.connect((err) => {
        if (err) {
            throw err
        } else {
            console.log("db connected");
        }
    })
}

const db = {
    connectToDb, conn
}

module.exports = db