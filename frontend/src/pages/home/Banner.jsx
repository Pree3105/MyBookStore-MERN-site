import React from 'react'
import bannerImg from '../../assets/banner.png'

const Banner = () => {
    return (
      <div className='flex flex-col md:flex-row-reverse px-16 py-16 justify-between items-center gap-5'>
        <div className='md:w-3/5 w-full flex justify-center md:justify-center'>
          <img src={bannerImg} alt="" className='w-full md:w-[80%] lg:w-[70%] xl:w-[60%] h-auto' />
        </div>
        <div className='md:w-2/5 w-full'>
          <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Arrivals! </h1>
          <p className='mb-10'>Stay updated with the latest books hitting our shelves every week. Discover new stories, genres, and authors that are sure to captivate your imagination.</p>
          <button className='btn-primary'>Subscribe!</button>
        </div>
      </div>
    )
  }
  
  

export default Banner
