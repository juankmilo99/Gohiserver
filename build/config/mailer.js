"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'punishman99@gmail.com',
        pass: 'aktjxocxlfxjpryr', // generated ethereal password
    },
});
exports.transporter.verify().then(() => {
    console.log('ready for send emails');
});
