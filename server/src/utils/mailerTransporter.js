const nodemailer = require("nodemailer");
const ENV = require("../config/ENV");

const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: ENV.MAILER_USER,
        pass: ENV.MAILER_PASSWORD
    }
})

module.exports = {mailTransporter}