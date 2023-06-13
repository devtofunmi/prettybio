import React from 'react'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import HomepageNavbar from '../components/HomepageNavbar'

const Index = () => {
  return (
    // bg-[#f5f8f9]
    <div className="font-abc">
      <HomepageNavbar/>
     <Hero/>
     <Features />
     <Footer />
     </div>
  )
}

export default Index
