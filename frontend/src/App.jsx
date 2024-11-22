import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvide } from './context/AuthContext'
import { useEffect, useState } from 'react'
import Loading from './components/Loading'

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />; 
  }


  return (
    <>
      <AuthProvide>
        <Navbar />
        <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
          <Outlet />
        </main>
        <Footer />
      </AuthProvide>

    </>
  )
}

export default App



// import { useState } from 'react'
// import './App.css'
// import { Outlet } from 'react-router-dom'
// import Navbar from './components/navbar'
// import Footer from './components/Footer'



// function App() {

//   return (
//     <>
//     <AuthProvider>
//     <Navbar/>  {/*//importing Navbar.jsx*/}
//     <main className='min-h-screen  max-w-screen-2xl mx-auto px-4 py-6'>
//       <Outlet/>  {/* renders all children of the router.jsx */}
//       </main>
//     <Footer/>
//     </AuthProvider>
//     </>
//   )
// }

// export default App
