import React from "react";
import "./Contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const Contact = () => {

  const ImageBox =styled(Box)(({theme})=>({
    display: "flex",
    justifyContent:'flex-end',
    [theme.breakpoints.down('md')]:{
      display: "none",
      flexDirection: "column"
    }
  
  }))

  return (
    <Box className="contact">
      <div className="wrapper">
        <span>BE IN TOUCH WITH US:</span>
        <div className="mail">
          <input type="text" placeholder="Enter your e-mail..." />
          <button>JOIN US</button>
        </div>
        <ImageBox >
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
          <GoogleIcon />
          <PinterestIcon />
        </ImageBox>
      </div>
    </Box>
  );
};

export default Contact;
