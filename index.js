// Importing the packages
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const qrcode = require("qrcode");


//init app 
const app = express();
//assign port
const port = process.env.port || 3000;

//Middlewares used,fetch the data from request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using the ejs as our template engine ,all ejs files are in views folder

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

//use the express.static built-in middleware function to serve static files such as images, CSS files
app.use(express.static("public"));

//Create a listener to the  route (/) and render the index.ejs file.

app.get("/", (req, res, next) => {
  res.render("index");
});

//Add a POST request listener to convert Text/URL to QR Code.
app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
    // Let us convert the input stored  
    // It shall be returned as an image 
    // In case of an error, it will save the error inside the "err" variable 
  qrcode.toDataURL(input_text, (err, src) => {
    if (err) res.send("Something went wrong!!");

    res.render("scan", {
      qr_code: src,
    });
  });
});

// listening on port
app.listen(port, console.log(`Listening on port ${port}`));