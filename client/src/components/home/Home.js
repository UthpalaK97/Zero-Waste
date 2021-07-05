import React from 'react';
import '../buyer/home/Home.css';
import HomeCards from './HomeCards';
import HomeHeroSection from './HomeHeroSection';
import Navbar from './HomeNavbar';
import Footer from "../buyer/home/Footer";
import HomePartnerCards from "./HomePartnerCard";

function Home() {
    return (
        <>
            <Navbar/>
            <HomeHeroSection/>
            <HomePartnerCards/>
            <HomeCards/>
            <Footer/>
        </>
    );
}

export default Home;