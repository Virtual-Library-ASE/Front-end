import pic1 from './images/pic1.png'
import './App.css'
import React from 'react'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Card, Container } from '@mui/material';
import TableBarIcon from '@mui/icons-material/TableBar';
import BasicCard from './cards';

function App() {
  // let isShowLoginDialog = true
  const [isShowLoginDialog, setShowLoginDialog] = useState(false)
  const [isShowSignUpDialog, setShowSignUpDialog] = useState(false)
  const [isShowBookingDialog, setShowBookingDialog] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">Facial Recognition Relaplacing Leap Card ? </div>
        <div className="nav">
          <div className="nav-item">Home</div>
          <div className="nav-item">History</div>
          <div className="nav-item" onClick={() => {setShowBookingDialog(!isShowBookingDialog)}}>History</div>
          {/* <div className="nav-item">Contact Us</div>  */}
          <div className="nav-item" onClick={() => {setShowLoginDialog(!isShowLoginDialog)}}>Sign Up</div>
          <div className="nav-item" onClick={() => {setShowSignUpDialog(!isShowSignUpDialog)}}>Log In </div>
          <div className="nav-item"><ShoppingCartIcon size="medium"/></div>
          <div className="nav-item"><SearchIcon size="medium"/></div>
          <div className="nav-item"><PersonIcon size="medium"/></div>
          <div>
            <i className="el-icon-edit"></i>
            <i className="el-icon-share"></i>
            <i className="el-icon-delete"></i>
          </div>
        </div>

        <div className="banner">
          <div className="img">
            <img src={pic1} alt="" />
            <div className="btn"><span>Book a desk</span></div>
          </div>
          <div className="img">
            <img src={require('./images/pic1.png')} alt="" />
            <div className="btn"><span>Book a desk</span></div>
          </div>
          <div className="img">
            <img src={pic1} alt="" />
            <div className="btn"><span>Book a desk</span></div>
          </div>
          <div className="img">
            <img src={pic1} alt="" />
            <div className="btn"><span>Book a desk</span></div>
          </div>
        </div>
         <div className='img'>
        <BasicCard />
        </div> 


        <div className={(isShowLoginDialog ? 'show' : 'hidden') + ' login-dialog'}>
          <div className="container">
            <div className="exit" onClick={() => { setShowLoginDialog(!isShowLoginDialog) }}>X</div>
            <div className="header">
              Sign up
            </div>
            <div className="body">
              <div className="name">
                <input type="text" className="firstName" placeholder="First Name" />
                <input type="text" className="LastName" placeholder="Last Name" />
              </div>
              <div className="email">
                <input type="text" className="email-ipt" placeholder="Email address" />
              </div>
              <div className="pwd">
                <input type="text" className="pwd-ipt" placeholder="Create password" />
              </div>
            </div>
            <div className="footer">
              <div className="sign-up">Sign Up</div>
              <div className="log-in" onClick={() => { setShowLoginDialog(!isShowLoginDialog) }}>Login instead?</div>
            </div>
          </div>
        </div>
        <div className={(isShowSignUpDialog ? 'show' : 'hidden') + ' signup-dialog'}>
          <div className="container">
            <div className="exit" onClick={() => { setShowSignUpDialog(!isShowSignUpDialog) }}>X</div>
            <div className="header">
              Log In
            </div>
            <div className="body">
              <div className="email">
                <input type="text" className="email-ipt" placeholder="Email address" />
              </div>
              <div className="pwd">
                <input type="text" className="pwd-ipt" placeholder="Create password" />
              </div>
            </div>
            <div className="footer">
              <div className="sign-up">Log In</div>
              <div className="log-in" onClick={() => { setShowLoginDialog(!isShowLoginDialog) }}>Sign Up instead?</div>
            </div>
          </div>
        </div>

        <div className={(isShowBookingDialog ? 'show' : 'hidden') + ' signup-dialog'}>
          <div className="container">
            <div className="exit" onClick={() => { setShowBookingDialog(!isShowBookingDialog) }}>X</div>
            <div className="header">
              Booking Desks
            </div>
            <div className="body">
              <div className="nav-item">
                <TableBarIcon style ={{align: "left"}}/> <TableBarIcon style ={{align: "left"}}/> <TableBarIcon/>
              </div>
              <div className="nav-item">
                <TableBarIcon style ={{align: "left"}}/> <TableBarIcon style ={{align: "left"}}/> <TableBarIcon/>
              </div>
              <div className="nav-item">
                <TableBarIcon style ={{align: "left"}}/> <TableBarIcon style ={{align: "left"}}/> <TableBarIcon/>
              </div>
            </div>
            <div className="footer">
              {/* <div className="sign-up">Log In</div>
              <div className="log-in" onClick={() => { setShowLoginDialog(!isShowBookingDialog) }}>Sign Up instead?</div> */}
            </div>
          </div>
        </div>
      </header>
    </div>
            
  )
}

export default App
