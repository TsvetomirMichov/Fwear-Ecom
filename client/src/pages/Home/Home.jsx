import React from 'react'
import Contact from '../../components/Contact/Contact'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Slider from '../../components/MainCarousel/Slider'
import { Box, Button, Container, Typography } from '@mui/material'
import ProductsImage from "../../assets/Promo-Home.png"
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { TbTruckDelivery } from 'react-icons/tb'
import { BiSupport } from 'react-icons/bi'
import { AiOutlineFileProtect } from 'react-icons/ai'
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer'
import { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { makeRequest } from '../../makeRequest'

const Home = () => {
  const targetDate = 'August 30, 2023 23:59:59 UTC +2';

  const buttonStyles = {
    color: 'black', // Text color
    border: '1px solid black', // Black border

    // Transition effect on hover
    transition: 'background 0.3s',
    '&:hover': {

      background: 'linear-gradient(to right, #D16666 500%, transparent 100%)', // Reverse gradient on hover
      color: 'white', // Text color
      border: '1px solid white', // Black border

    },
  };
 useEffect(()=>{
  const getData=async ()=>{

    const res = await makeRequest.get("/createOrder",{
      products: "products"
    });
    console.log(res)
  }
   getData()
 },[])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: '1em' }}>
      <Slider />
      <FeaturedProducts type="featured" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '90%',
          mx: 'auto',
          maxHeight: '90vh',
          justifyContent: 'space-around', // Center content horizontally
          alignItems: 'center',
          backgroundColor: '#F5E6E1',
          marginY:'5em'
        }}>
        {/* Image on the left */}
        <Box sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: '40em', alignItems: 'end', }}>
          <img src={ProductsImage} alt="img" style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }} />
        </Box>

        {/* Text on the right */}
        <Box sx={{

        }}>
          <Box sx={{ backgroundColor: 'white', color: 'black', p: '2em', m: '0.5em', height: '100%', maxWidth: '15em', boxShadow: '0px 5px 7px rgba(0, 0, 0, 0.5)', zIndex: 2 }}>
            <Typography variant='body2' letterSpacing={15} py={1} fontWeight={300}>SAVE OFF</Typography>
            <Typography variant='h2' letterSpacing={10} py={1} fontWeight={600}>30%</Typography>
            <Typography variant='body1' letterSpacing={2} py={1} fontWeight={200}>NEW OFFER PRODUCTS</Typography>
            <CountdownTimer targetDate={targetDate} />
            <Link to={'products/women'} style={{
              textDecoration: 'none',
              color: 'black'
            }}>
              <Button sx={buttonStyles}>
                Shop now
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

      <FeaturedProducts type="best selling" />
      <Container >
        <Box sx={{ display: { xs: "column", sm: 'flex' }, alignItems: 'center', justifyContent: 'space-evenly', }} p={10}>

          <Box display={"flex"} flexDirection={"column"} alignItems={'center'}  >
            <TbTruckDelivery size={90} />
            <Typography fontSize={17} fontWeight={700} >
              24/7 CUSTOMER SUPPORT
            </Typography>
            <Typography >
              Frendly 24/7 customer support
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} alignItems={'center'} >
            <BiSupport size={90} />
            <Typography fontSize={17} fontWeight={700} >
              24/7 CUSTOMER SUPPORT
            </Typography>
            <Typography >
              Frendly 24/7 customer support
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} alignItems={'center'}>
            <AiOutlineFileProtect size={90} />
            <Typography fontSize={17} fontWeight={700} >
              24/7 CUSTOMER SUPPORT
            </Typography>
            <Typography >
              Frendly 24/7 customer support
            </Typography>
          </Box>
        </Box>
      </Container>
      <Contact />
    </Box>

    // It has to be like this 
  )
}

export default Home