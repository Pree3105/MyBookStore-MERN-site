const mongoose=require('mongoose');

//1)schema-title,description, categories etc.
const bookSchema = new mongoose.Schema({  //take from mongoose site
    title:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    trending:{
        type:Boolean,
        required:true
    },
    coverImage: {
        type: String,
        required: true,
    },
    oldPrice:{
        type: Number,
        required:true
    },
    newPrice:{
        type: Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
  },{
    timestamps: true,  //tracks activity when u update smthn
  }

);

//2)create model & export
const Book = mongoose.model('Book', bookSchema);
module.exports=Book;