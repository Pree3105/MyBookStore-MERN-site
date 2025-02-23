import React from 'react'
import {useDeleteBookMutation, useFetchAllBooksQuery} from '../../../redux/features/books/booksApi'
import {Link, useNavigate} from 'react-router-dom'


const ManageBooks = () => {
  const navigate=useNavigate();
  const {data: books, refetch}= useFetchAllBooksQuery();
  const [deleteBook]= useDeleteBookMutation();

  const handleDeleteBook=async(id)=>{
    try{
      await deleteBook(id).unwrap();  //(Redux query, extracts the actual response n returns a fulfilled or rejected response inside an object.
      //Without .unwrap(), the returned value would be an object with { data: ..., error: ... }.
      alert('Book deleted successfully ')
      refetch();
    }catch(error){
      console.error('Failed to delete book- ', error.message);
      alert('Failed to delete book. Please try again')
    }
  }

  // Handling navigating to Edit Book page
  const handleEditClick = (id) => {
    navigate(`dashboard/edit-book/${id}`);
};
  return (
    <div className='max-w-7xl mx-auto mt-4 '>
      <div className='rounded-lg shadow-lg bg-white overflow-hidden '>
        <div className='flex justify-between items-center px-6 py-3'>
          <h3 className='text-semibold text-gray-700 '>All Books</h3>
          <button className='bg-pink-950 text-white rounded-md px-2 py-2'>See All</button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead >
              <tr className='text-sm font-semibold text-gray-700 text-left'>
                {['#','BOOK TITLE', 'CATEGORY', 'PRICE', 'ACTIONS'].map((head)=>(
                  <th key={head} className='px-6 py-3'>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books?.map((book,index)=>(
                <tr key={book._id} className='border-t'>
                  <td className='px-6 py-4'>{index+1}</td>
                  <td className='px-6 py-4'>{book.title}</td>
                  <td className='px-6 py-4'>{book.category}</td>
                  <td className='px-6 py-4'>{book.newPrice}</td>
                  <td className='px-6 py-4'>
                    <Link to={`/dashboard/edit-book/${book._id}`} className='text-gray-700 underline hover:text-pink=950'>Edit</Link>
                    <button onClick={()=>handleDeleteBook(book._id)} className='bg-red-500 text-white rounded-full px-2 py-1'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageBooks
