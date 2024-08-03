// const express = require('express')
// set up in file json: "type": "module" => use import syntax

import express from 'express'  
import dotenv from 'dotenv'
import { connectDB } from './config/database.js';
import productRouter from './routes/product_router.js';
import path from "path"
// import bodyParser from 'body-parser';


dotenv.config();

const PORT = process.env.PORT || 5000;

//C:\Users\Phi\OneDrive - VietNam National University - HCM INTERNATIONAL UNIVERSITY\Desktop\Product_Store => route of project
const __dirname = path.resolve(); 

const app = express();
// app.use(bodyParser.json());

app.use(express.json()); // allow to accept Json data

app.use("/api/product", productRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}


app.listen(PORT, () =>{
    connectDB()
    console.log('listening on port', PORT)
})