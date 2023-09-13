import styled from "@emotion/styled";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import React from "react";

const Footer = () => {

  const BoxTop =styled(Box)(({theme})=>({
    display: "flex",
    justifyContent:'flex-end',
    [theme.breakpoints.down('md')]:{
      display: "flex",
      flexDirection: "column"
    }
  }))

  const CopyRightBox =styled(Box)(({theme})=>({
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up('md')]:{
      display: "flex",
      flexDirection: "row"
    }
  }))

  const PaymentLogo = styled('img')(({theme})=>({
    height:'4.5em',
    width:'30em',

    [theme.breakpoints.down('md')]:{
      width:'20em',
      height:'3.5em',
    }
  }));
  return (
    <Box display={"block"}>
       <Divider variant="fullWidth"  sx={{ml:0,borderBottomWidth:'2',width:'90vw',backgroundColor:'black',marginLeft:'1em'}}/>
    <List className="footer"  sx={{margin:'0.25em 3.25em'}}>
      <BoxTop className="top" >
        <ListItem className="item" 
        sx={{
          display:'flex',
          flexDirection:'column',
          gap:1,
          textAlign:'center',
          fontSize:'1.5em'
        }}>
          <Typography variant="h6" fontWeight={900}>Categories</Typography>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
      </ListItem>

        <ListItem className="item"
         sx={{
           display:'flex',
           flexDirection:'column',
           gap:1,
           textAlign:'center',
           fontSize:'1.5em'
          }}>
          <Typography variant="h6" fontWeight={900}>Links</Typography>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </ListItem>
        <ListItem className="item"
         sx={{
          display:'flex',
          flexDirection:'column',
          gap:1,
          textAlign:'center',
          fontSize:'1.5em'
        }}
        >
          <Typography variant="h6" fontWeight={900}>About</Typography>
          <span>
          Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
            eiusmod tempor .
          </span>
        </ListItem>
        <ListItem className="item"
        
        sx={{
          display:'flex',
          flexDirection:'column',
          gap:3,
          textAlign:'center',
          fontSize:'1.5em'
        }}>
          <Typography variant="h6" fontWeight={900}>Contact</Typography>
          <span>
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
          </span>
        </ListItem>
      </BoxTop>
    
        <CopyRightBox  justifyContent={'space-evenly'} alignItems={'center'}  width='100%' textAlign='center' pt="2.5em">
          <Typography variant="body3" className="copyright" letterSpacing={2} >
          <span className="logo">FWEAR </span>
            © Copyright 2023. All Rights Reserved
          </Typography>
          <PaymentLogo src="/img/payment.png" alt="" />
        </CopyRightBox>
    </List>
</Box>
  );
};

export default Footer;
