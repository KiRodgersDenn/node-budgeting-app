const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", (req,res)=>{
    res.send("Welcome to our transactions page")
});

app.get("*",(req, res)=>{
    res.status(404).json({error:"Page not found"});
});

module.exports = app;