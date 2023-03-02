import "./Sign.css";
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
export default function Sign(props) {
  const logo = require("../../resources/images/logo.png");

  const handleClose = () => {
    props.handleLogin(false);
  };

  return (
    <div className="modal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.isLogin}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.isLogin}>
          <div className="modal-content absolute top-1/2 left-1/2 bg-color-white px-12 rounded outline-none">
            <div
              className="quit absolute top-1 right-1 cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon></CloseIcon>
            </div>
            <img
              src={logo}
              alt="Logo"
              className="logo w-1/3 block m-auto my-8"
            />
            <h3 className="modal-title text-center text-2xl font-bold mb-4">
              Sign In
            </h3>
            <div className="email text-xs mb-4">
              <TextField label="Email" variant="standard" className="w-full" />
            </div>
            <div className="password text-xs">
              <TextField
                label="Password"
                variant="standard"
                className="w-full"
                type="password"
              />
            </div>

            <div className="footer my-9 text-center">
              <Button variant="outlined">Sign In</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
