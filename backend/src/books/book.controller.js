const Book = require("./book.model");

const postABook=async(req,res)=>{
    try{
        const newBook =await Book({...req.body});   //here Book is the model
        await newBook.save(); //save it on ur database
        res.status(200).send({message:"Book posted successfully ", book:newBook})
    }   
    catch(error){
        console.error("Error creating book", error);
        res.status(500).send("Failed to create a book");
    }    
}

//get all books
const getAllBooks= async(req,res)=>{
    try{
        const books=await Book.find() .sort({createdAt: -1}); //sort the books in descending order acc to time ,latest book 1st
        res.status(200).send(books)
    }
    catch(error){
        console.error("Error fetching books", error);
        res.status(500).send("Failed to fetch books");
    }
}
const getSingleBook = async (req, res) => {
    try {
        //1st ull get the id of book from params (req)
        const {id} = req.params;
        const book =  await Book.findById(id);
        if(!book){
            res.status(404).send({message: "Book not Found!"})
        }
        res.status(200).send(book) //sending response
        
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({message: "Failed to fetch book"})
    }

}

// update book data
const UpdateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook =  await Book.findByIdAndUpdate(id, req.body, {new: true});  //if new data is found then it will insert that
        if(!updatedBook) {
            res.status(404).send({message: "Book is not Found"})
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook    //update book
        })
    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({message: "Failed to update a book"})
    }
}

const deleteABook = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook =  await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({message: "Failed to delete a book"})
    }
};

module.exports={
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
}