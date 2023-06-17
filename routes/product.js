const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { client } = require('../bd.js');


//------------------------------- Login --------------------------------------------


router.post('/login', async (req, res) => {
    const Email = req.body.email;
    const password = req.body.password;

    client.query(
        `SELECT * FROM public."User" WHERE "Email" = $1`,
        [Email],
        (err, results) => {
            if (err) {
                console.log(err);
            }

            if (results.rows.length === 0) {
                res.status(404).json({
                    message: "User not found!",
                });
            } else {
                const user = results.rows[0];

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                    }

                    if (isMatch) {
                        res.status(200).json({
                            message: "Login successful!",
                            id_user: user.id_user,
                        });
                    } else {
                        res.status(401).json({
                            message: "Invalid password!",
                        });
                    }
                });
            }
        }
    );
});



module.exports = router;