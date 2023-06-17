const randomString = require('randomstring');
const smtpTransport = require('nodemailer-smtp-transport');
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { client } = require('../bd.js');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

router.post('/forgot-password', async (req, res) => {
    console.log('here in forgot password !');
    const email = req.body.email;

    client.query(
        `SELECT * FROM public."User" WHERE "Email" = $1`,
        [email],
        async (err, results) => {
            if (err) {
                console.log(err);
            }

            if (results.rows.length > 0) {
                const user = results.rows[0];
                console.log('get the user', user);
                
                const transporter = nodemailer.createTransport(smtpTransport({
                    service: 'gmail',
                    port: 465,
                    secure: true,
                    auth: {
                        user: "ghofran.bentk@gmail.com",
                        pass: "odgbwwkbvfxnbbbt"
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                }));
                
                const templatePath = path.resolve('./views', 'resetPassword.html');
                const registerTemplate = fs.readFileSync(templatePath, { encoding: 'utf-8' });
                const url = 'http://localhost:4200';
                const render = ejs.render(registerTemplate, { name: user.name, link: `${url}/reset_passwrod` });

                try {
                    const info = await transporter.sendMail({
                        from: 'HOLISTIC_PLAY',
                        to: user.Email,
                        subject: "Password reset",
                        html: render
                    });
                    console.log('Email sent:', info);
                  
                } catch (err) {
                    console.log('Error sending email:', err);
                }

                res.json({ message: 'Check your mailbox' });
            } else {
                console.log('User not found!');
                res.status(200).json({
                    message: "0" // Non-existent user
                });
            }
        }
    );
});

module.exports = router;
