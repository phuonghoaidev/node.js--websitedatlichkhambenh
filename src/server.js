import cors from 'cors';
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initwebRoutes from "./route/web";
import connectDB from "./config/connectDB";

require("dotenv").config();

let app = express();
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// config app
app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

viewEngine(app);
initwebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("Backend Nodejs is runing on the port : " + port);
});
