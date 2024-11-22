import React from 'react'
import Banner from './Banner'
import TopSellers from './topSellers'
import Recommended from './Recommended'

const Home = () => {
  return (
    <div>
      <>
        <Banner/>
        <TopSellers/>
        <Recommended/>
      </>
    </div>
  )
}

export default Home
