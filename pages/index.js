import React from 'react'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

import Navbar from '../components/Navbar'

const Index = () => {
  return (
    // bg-[#f5f8f9]
    <div className="bg-gradient-to-r from-blue-100 to-fuchsia-200 font-abc">
      <Navbar/>
     <Hero/>
     <Features />
     <Footer />
     </div>
  )
}

export default Index
