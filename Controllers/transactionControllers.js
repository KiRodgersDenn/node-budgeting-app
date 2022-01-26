const express = require("express");
const transactionControllers = express.Router(); // export to use in app.js
const transactionsArr = require("../Models/data.js");

// Routes

// /transactions
transactionControllers.get("/", (req, res)=>{
    res.json(transactionsArr) // this page will return the data
});

// /transactions/:id
transactionControllers.get("/:index", (req, res)=>{
    // deconstructing req.params.index
    const { index } = req.params;
    // is the index truthy
    if(transactionsArr[index]){
        // return the transactionArr[#]
        res.json(transactionsArr[index]);
    } else {
        res.status(404).json({error: "Not Found"})
    };
});

// Create
// /transactions
transactionControllers.post("/", (req, res)=>{
    transactionsArr.push(req.body);
    res.json(transactionsArr[transactionsArr.length-1]);
});

// /transactions delete 
transactionControllers.delete("/:index", (req, res)=>{
    const { index } = req.params;
    if(transactionsArr[index]){
        let removed = transactionsArr.splice(index, 1);
        res.json(removed[0]);
    } else{
        res.status(404).json({error: "Not Found"});
    };
});

// transactions update
transactionControllers.put("/:index", (req, res)=>{
    let { index } = req.params;

    if(!transactionsArr[index]){
        res.status(422).json({
            error: "Not Found"
        });

        return; // return stops the program
    }

    let { date, name, amount, from } = req.body;
    if(date && name && amount && from){
        transactionsArr[index] = {
            date, name, amount, from
        };
        res.json(transactionsArr[index]);
    } else {
        res.status(422).json({
            error: "Please provide all fields"
        });
    };
});

module.exports = transactionControllers;



