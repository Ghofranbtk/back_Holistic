const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "Holistic_play",
});

client.connect()
    .then(() => {
        console.log('Connected to the PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to the PostgreSQL database', err);
    });


// client.query(`SELECT * from "User"`, (err, res) => {
//     if (!err) {
//         console.log(res.rows);
//     }
//     else {
//         console.log(err.message);
//     }
  
// })



module.exports = { client };

