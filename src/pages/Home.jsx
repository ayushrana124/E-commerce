import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import HomeCarousel from '../components/HomeCarousel'
import FeatureProducts from '../components/FeatureProducts'
import Footer from '../components/Footer'

const Home = () => {
  const [category, setcategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  
  return (
    <>
    <Navbar setcategory={setcategory} setSearchText={setSearchText}/>
    <HomeCarousel />
    <FeatureProducts category={category} searchText={searchText}/>
    <Footer />
    </>
  )
}

export default Home