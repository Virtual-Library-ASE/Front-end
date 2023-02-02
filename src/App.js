import pic1 from './images/pic1.png';
import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">Virtual Library</h2>
        <div className="nav">
          <div className="nav-item">Home</div>
          <div className="nav-item">New Books</div>
          <div className="nav-item">Desks</div>
          <div className="nav-item">Contact Us</div>
        </div>

        <div className="banner">
          <div className="img">
            <img src={pic1} alt="" />
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
          <div className="img">
            <img src={pic1} alt="" />
            <div  className="btn"><span>Book a desk</span></div>
          </div>
        </div>
        <div className="login-dialog">
          <div className="container">
            <div className="exit">X</div>
            <div className="header">
              Sign up
            </div>
            <div className="body">
              <div className="name">
                <input type="text" className="firstName" placeholder="First Name"/>
                <input type="text" className="LastName" placeholder="Last Name"/>
              </div>
              <div className="email">
                <input type="text" className="email-ipt" placeholder="Email address"/>
              </div>
              <div className="pwd">
                <input type="text" className="pwd-ipt" placeholder="Create password"/>
              </div>
            </div>
            <div className="footer">
              <div className="sign-up">Sign Up</div>
              <div className="log-in">Login instead?</div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
