import React from "react";
import { useState } from "react";
 import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartReducer";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack'

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  let imgArray = ["img","img2"];
  
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);
   
  const BoxContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection:'row',
    [theme.breakpoints.down('sm')]: {
      display: "flex",
      flexDirection: 'column',
    }
  }))

  const BoxImages = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection:'column',
    [theme.breakpoints.down('sm')]: {
      display: "flex",
      flexDirection: 'row',
    }
  }))

  const BoxImageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection:'row',
    marginRight:'2em',
    [theme.breakpoints.down('sm')]: {
      display: "flex",
      flexDirection: "column-reverse",
      marginRight:0,
      
    }
  }))
  const Syledimg = styled('img')(({ theme }) => ({
    width:'100%',
    height: "5rem",
   objectFit: "cover",
    cursor: "pointer",
    marginBottom: "1em",
    padding:"1em",
    
    [theme.breakpoints.down('sm')]: {
      display: "flex",
      flexDirection: "row",
      height: "100px",
      width:'100px',
      padding:"0.5em",
      
    }
  }))

  return (
    <div className="product">
      {loading ? (
        <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
      ) : (
        <BoxContainer>
          <BoxImageContainer className="left">
            <BoxImages >
            <Syledimg
                src={
                  process.env.REACT_APP_UPLOAD_URL+data?.attributes?.img?.data?.attributes?.url}
                alt=""
                onClick={e => setSelectedImg(imgArray[0])}
              />
              <Syledimg
                src={
                  process.env.REACT_APP_UPLOAD_URL+data.attributes?.img2?.data?.attributes?.url 
                }
                alt=""
                onClick={e => setSelectedImg(imgArray[1])}
              />
            </BoxImages>
            <Box className="mainImg" >
              <img
                src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.[selectedImg]?.data?.attributes?.url}
                alt=""
              />
            </Box>
          </BoxImageContainer>
          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">${data?.attributes?.price}</span>
            <p>{data?.attributes?.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addProduct({
                    id: data.id,
                    title: data.attributes.title,
                    desc: data.attributes.desc,
                    price: data.attributes.price,
                    img: data.attributes.img.data.attributes.url,
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">  
              <Typography variant="body3"> Name: {data?.attributes?.title}</Typography>
              <Typography variant="body3"> Type: {data?.attributes?.type}</Typography>
              <Typography variant="body3">Size: {data?.attributes?.size}</Typography>
            </div>
            <hr />
          </div>
        </BoxContainer>
      )}
    </div>
  );
};

export default Product;
