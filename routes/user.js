const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { client } = require('../bd.js');


//------------------------------- Login --------------------------------------------


router.post('/login', async (req, res) => {
    const Email = req.body.email;


    client.query(
        `SELECT * FROM public."User" WHERE "Email" = $1`,
        [Email],
        (err, results) => {
            if (err) {
                console.log(err);
            }

            if (results.rows.length == 0) {
                console.log('user not find !');
                res.status(404).json({
                    message: "1"
                });
            } else {
                console.log('user find !');
                const user = results.rows[0];
                bcrypt.compare(req.body.pwd, user.password, (err, resp) => {
                    if (!resp) {
                        // console.log('hashage 5ayeb');
                        res.status(200).json({
                            message: "2",
                            id_user: user.id_user,
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "Login successful!",
                            id_user: user.id_user,
                        });
                    }
                });
            }
        }
    );
});

//-------------------------- Signup------------------------------------------

router.post('/signup', async (req, res) => {

    bcrypt.hash(req.body.pwd, 10).then(
        (cryptedPwd) => {

            let name = req.body.name;
            let Email = req.body.email;
            let phone = req.body.phone;
            let pwd = cryptedPwd;
            let country = req.body.country;

           // console.log('new password ', pwd);

            client.query(
                `Select * from public."User" where "Email" = $1 `,
                [Email],
                (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('2\n', results.rows);
                    if (results.rows.length > 0) {
                        res.status(200).json({
                            message: "1" // Existent user !
                        })
                    }
                    else {

                        client.query(
                            `INSERT INTO "User" ("name","Phone","Email","Country","password") VALUES ($1, $2, $3,$4,$5) RETURNING "id_user"`,
                            [name, phone, Email, country, pwd],
                            (err, results) => {
                                if (err) {
                                    throw err;
                                }
                                const id_user = results.rows[0].id_user;
                                res.status(200).json({
                                    message: "User added successfully! ",
                                    id: id_user
                                })
                                console.log(results.rows);
                            }
                        );
                    }
                }
            );
        })
});

//------------------------------ get email -----------------------------------
router.get("/:email", (req, res) => {
    console.log('Here in get user by email', req.params.email);
    const email = req.params.email;

    client.query(
        `Select * from public."User" where "Email" = $1 `,
        [email],
        (err, results) => {

            console.log('user :\n', results.rows);
            if (results.rows.length > 0) {
                console.log('get the user');
                res.status(200).json({
                    message: "1", // Existent user !
                    user: results.rows
                });
            }
            else {
                console.log('user not defined !');
                res.status(200).json({
                    message: "0" // !Existent user 
                });
            }

        });
});

//--------------------------- Edit user by id --------------------------

router.put("/:id", (req, res) => {
   // console.log('Here in edit user', req.body[0]);
   // console.log('id user', req.body[0].id_user);
    const id_user = req.body[0].id_user ;
    const data = req.body[0];
    bcrypt.hash(data.password, 10)
        .then((cryptedPwd) => {
            console.log('crypted password :',cryptedPwd);
            let name = data.name;
            let email = data.Email;
            let phone = data.Phone;
            let pwd = cryptedPwd;
            let country = data.Country;
            let id =id_user;
            
            client.query(
                `UPDATE public."User" SET "name" = $1, "Phone" = $2, "Email" = $3, "Country" = $4, "password" = $5 WHERE "id_user" = $6`,
                [name, phone, email, country, pwd, id],
                (err, results) => {

                    if (err) {
                        throw err;
                    }
                    else{
                        console.log('succes !');
                    res.status(200).json({
                        message: "User edited successfully! ",
                        id: id_user
                    })
                   
                }
                });
        });
});

//----------------------------------------------------










module.exports = router;