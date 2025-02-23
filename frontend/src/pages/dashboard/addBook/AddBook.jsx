import {  React, useState }from 'react' 
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form'
import {useAddBookMutation} from '../../../redux/features/books/booksApi'
import Swal from 'sweetalert2'

const AddBook = () => {
    const {register, handleSubmit, formState:{errors}, reset}=useForm();
    const [imageFile, setImageFile]= useState(null);
    const [imageFileName, setImageFileName]=useState('');
    const [addBook, {isLoading, isError}]=useAddBookMutation();

    const onSubmit=async(data)=>{
        const newBookData={ ...data , coverImage:imageFileName}
        try{
            await addBook(newBookData).unwrap();
            Swal.fire({
                title:"New Book added",
                text:"Your book has been added successfully",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor:"#3085d6",
                cancelButtonColor:"#d33",
                confirmButtonText:"Confirm"
            });
            reset(); //clears the form fields after a successful submission so the user can add a new book without manually erasing inputs.
            setImageFileName('');
            setImageFile(null);
        }catch(error){
          console.error(error);
          alert("Failed to add a book, please try again. ");
        }
      }
      const handleFileChange=(e)=>{
        const file=e.target.files[0];
        if(file){
          setImageFile(file);
          setImageFileName(file.name)
        }
      }

  return (
    <div className='max-w-lg md:p-6 p-3 bg-white rounded-lg shadow-md '>
      <h2 className='block text-lg font-bold text-gray-700 '>Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField  label="Title" name="title" register={register} placeholder="Enter book title"/>
        <InputField label="Description" name="description" register={register} type='textarea' placeholder="Enter book description"/>
        <SelectField label="Category" name="category" 
        options={[
          {value:'', label:'Choose a category'},
          {value:'business', label:'Business'},
          {value:'technology', label:'Technology'},
          {value:'fiction', label:'Fiction'},
          {value:'horror', label:'Horror'},
          {value:'adventure', label:'Adventure'}
        ]}
        register={register}/>
         <div className="mb-4">
        <input type="checkbox" {...register('trending')}/>  <span>Trending</span>
        </div>

        <InputField  label="Old Price" type="number" name="oldPrice" register={register} placeholder="Enter old price"/>
        <InputField  label="New Price" type="number" name="newPrice" register={register} placeholder="Enter new price"/>

        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700'>Cover Image</label>
          <input type="file" accept='image/*' onChange={handleFileChange} className='mb-2 w-full' />
          {imageFileName && <p className='text-sm text-gray-500'>Selected: {imageFileName}</p>}
          <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
          { isLoading ? <span >Adding.. </span> : <span>Add Book</span> }
        </button>
        </div>
      </form>
    </div>
  )
}

export default AddBook
