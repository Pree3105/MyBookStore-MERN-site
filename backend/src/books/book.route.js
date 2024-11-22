//API for book.model
const express=require('express')
const router=express.Router();  //call the router mehtod & store
const Book=require('./book.model');
const { postABook,getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');



//frontend->req to backend server from API -> controller( if book schema format matches then req is valid) ->req sent to DB-> send response data back to server-> back to frontend

//post a book (only admin can)
router.post("/create-book",verifyAdminToken, postABook)  //u can create async function- recieves request & gives response, here function is in book.controller
//to submit smthn from frontend to database- post method, to get info from databse-get() method, edit/update-patch & put methods, delete() 

//get all books to show on frontend
router.get("/",getAllBooks )

// single book endpoint
router.get("/:id", getSingleBook);

// update a book endpoint, put- update everything, patch-update partially
router.put("/edit/:id",verifyAdminToken, UpdateBook);

router.delete("/:id",verifyAdminToken,  deleteABook)


module.exports=router;  //export router