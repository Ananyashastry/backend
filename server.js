const express = require("express");
const dotenv = require('dotenv');
const mysqlpool = require("./config/db");

dotenv.config();

const app = express();


app.use(express.json()); 


app.use('/api/v1/student', require('./routes/studentRoutes'));


app.get("/test", (req, res) => {
    res.status(200).send("<h1>Hey Ananya, Welcome!</h1>");
});

const port = process.env.PORT || 8000;
mysqlpool.query('SELECT 1').then(() => {
    console.log('DB connected');
    app.listen(port, () => {
        console.log("Server Running...");
    });
}).catch((error) => {
    console.log(error);
});
