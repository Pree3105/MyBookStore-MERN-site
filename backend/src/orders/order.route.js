//similar to book.route.js
const express = require('express');
const { createAOrder, getOrderByEmail } = require('./order.controller');

const router =  express.Router();

// creating order endpoint
router.post("/", createAOrder);  //function defined in .controller.js

// getting orders by user email 
router.get("/email/:email", getOrderByEmail);

module.exports = router;