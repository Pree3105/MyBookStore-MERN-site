const express = require('express')  //importing express from package.json
const app = express()    //call express, using app u can maintain server activity, browsing system
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;  
const cors=require("cors");

require('dotenv').config()

//middleware
app.use(express.json());
app.use(cors({  //create object
    origin:['http://localhost:5173','http://localhost:5173/'],
    credentials:true
}))


//define a route to show stuff on brwoser
//routes
const bookRoutes=require('./src/books/book.route') //import the route
app.use("/api/books", bookRoutes)  //base API-/api/books

const orderRoutes=require("./src/orders/order.route")
app.use("/api/orders", orderRoutes) 

const  userRoutes=require("./src/users/user.route")
app.use("/api/auth", userRoutes) 

const adminRoutes=require('./src/stats/admin.stats')
app.use("/api/admin",adminRoutes)

async function main() {   //main function-mongoose
    await mongoose.connect(process.env.DB_URL);  //db_url-secret name
    app.use('/', (req, res) => {       //path-'/'
        res.send('Welcome to server')
      })
  }

  main().then(()=> console.log("Mongodb connected!")).catch(err => console.log(err)); //call main function

//u have to use listen 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});