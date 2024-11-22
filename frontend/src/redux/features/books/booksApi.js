//cv from redux toolkit site

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const  baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,  //make a baseURL file
    credentials: 'include',
    prepareHeaders: (Headers) => {    
        const token =  localStorage.getItem('token');
        if(token) {   //if token is there then ..
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

//our API
//see the basic format from redux site
const booksApi = createApi({
    reducerPath: 'booksApi',  //1
    baseQuery,               //2, basequery defined above
    tagTypes: ['Books'],
    endpoints: (builder) =>({
        fetchAllBooks: builder.query({  //to get data-query
            query: () => "/",       //endpoint-'/', when u hit rootpath...modify TopSellers.jsx(frontned)
            providesTags: ["Books"]   //mention tagtypes at top
        }),

//configure the store.js after this (acc to redux site)

//creating a new api
        fetchBookById: builder.query({  //get request
            query: (id) => `/${id}`,    //it will recieve an id
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),

        addBook: builder.mutation({   //post request- use mutation
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]  //when u add a book, the data gets refreshed & book will get included in other APIs also, otherwise ul have to refresh ur browser
        }),

        updateBook: builder.mutation({   //put request
            query: ({id, ...rest}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]   //refresh book data
        }),

        deleteBook: builder.mutation({   //delete method
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        })
    })
})

//include 'use' keyword
export const {useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation} = booksApi;
export default booksApi;