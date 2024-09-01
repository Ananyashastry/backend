const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use("/assets", express.static("assets"));  // Serve static files from /assets
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser to parse form data

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login"
});

connection.connect(function (error) {
    if (error) throw error;
    else console.log("Connected to DB successfully!");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html"); // Serve the index.html file
});

app.post("/", function (req, res) {
    const username = req.body.username; // Access the username from the form
    const password = req.body.password; // Access the password from the form
    
    connection.query("SELECT * FROM loginuser WHERE user_name = ? AND user_pass = ?", [username, password], function(error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
    });
});

app.get("/welcome", function (req, res) {
    res.sendFile(__dirname + "/welcome.html");   
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
