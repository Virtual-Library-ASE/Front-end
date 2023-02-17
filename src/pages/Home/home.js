import './home.css';
import React from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import logo from '../../resources/images/logo.svg';
import Button from '@mui/material/Button';


function Home() {
  return (
    <div className="Home">
      <Header/>
      <Footer/>
    </div>
  );
}

export default Home;
