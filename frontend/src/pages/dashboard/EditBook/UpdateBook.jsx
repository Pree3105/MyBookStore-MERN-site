import {React,useEffect} from 'react'
import {useFetchBookByIdQuery, useUpdateBookMutation} from '../../../redux/features/books/booksApi'
import Swal from 'sweetalert2'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import getBaseUrl from '../../../utils/baseURL'
import axios from 'axios';
import Loading from '../../../components/Loading';


const UpdateBook = () => {
  const {id}=useParams();
  const {data: bookData, isLoading, isError, refetch}= useFetchBookByIdQuery(id);
  const [updateBook]=useUpdateBookMutation();
  const {register, handleSubmit, setValue, reset}=useForm();

  useEffect(()=>{
    if(bookData){
      setValue('title',bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData?.category)
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice)
      setValue('newPrice', bookData.newPrice)
      setValue('coverImage', bookData.coverImage);
    }
  },[bookData, setValue])

  const onSubmit=async(data)=>{
          const updateBookData={ 
            title:data.title,
            description:data.description,
            category:data.category,
            trending:data.trending,
            oldPrice:Number(data.oldPrice),
            newPrice:Number(data.newPrice),
            coverImage:data.coverImage || bookData.coverImage,
          }
          try{
              await axios.put(`${getBaseUrl()}/api/books/edit/${id}`,updateBookData,{ headers:{ 'Content-type':'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      //content-json means request body contains JSON data..... Authorization:..-sends/includes the user's authentication token
              Swal.fire({
                  title:"Book updated",
                  text:"Your book has been updated successfully",
                  icon: "success",
                  showCancelButton: true,
                  confirmButtonColor:"#3085d6",
                  cancelButtonColor:"#d33",
                  confirmButtonText:"Confirm"
              });
              await refetch();  //fetches updated data after a mutation & UI updates without needing a page refresh.
          }catch(error){
            console.error(error);
            alert("Failed to update the book, please try again. ");
          }
        }
    if(isLoading) return <Loading/>
    if(isError) return <div>Error fetching book data</div>

  return (
    <div className='max-w-lg md:p-6 p-3 bg-white rounded-lg shadow-md '>
      <h2 className='block text-lg font-bold text-gray-700 '>Update Book</h2>
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

        <InputField  label="Old Price" name="oldPrice" type="number" register={register} placeholder="Enter old price"/>
        <InputField  label="New Price" name="newPrice" type="number" register={register} placeholder="Enter new price"/>

        <div className='mb-4'>
        <InputField label="Cover Image URL" name="coverImage" type="text" placeholder="Cover Image URL" register={register} />
          <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
          Update Book
        </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateBook
