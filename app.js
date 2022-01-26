const express = require("express");
const app = express();
const transactionControllers = require("./Controllers/transactionControllers.js")
const cors = require("cors");

app.use(cors()); // connects frontend to backend
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Welcome to our transactions page")
});

app.use("/transactions", transactionControllers);

app.get("*",(req, res)=>{
    res.status(404).json({error:"Page not found"});
});

module.exports = app;