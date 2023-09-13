import styled from "@emotion/styled";
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartReducer";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const StyledImg = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '1em',
    transition: 'opacity 0.3s ease',
  });

  const CardWrapper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    margin: theme.spacing(4),
    borderRadius: '1em',
    '&:hover': {
      '& .overlay': {
        opacity: 1,
        height: '2em',
      },
    },
  }));

  const Overlay = styled(Box)({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 0,
    backgroundColor: 'white',
    opacity: 0,
    borderRadius: '1em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'height 0.3s ease',
    zIndex: 1000,
    padding:15,
    
  });

  return (
    <CardWrapper elevation={1}>
        <Box className="image">
        <Link className="link" to={`/product/${item.id}`}>
          <StyledImg
            src={process.env.REACT_APP_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url}
            alt=""
            className="mainImg"
          />
          <StyledImg
            src={process.env.REACT_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes?.url}
            alt=""
            className="secondImg"
          />
            </Link>
          <Overlay className="overlay">
            <Button 
            sx={{width:'80%'
            ,fontSize:'1em',
            fontWeight:'800',
            color:'black',
            border:'1px solid black',
            p:1,
          "&:hover":{
            backgroundColor:'#D16666',
            color: 'white',
            border:'1px solid white',
          }  
          }}
           onClick={() =>
            dispatch(
              addProduct({
                id: item.id,
                title: item.attributes.title,
                desc: item.attributes.desc,
                price: item.attributes.price,
                img: item.attributes.img.data.attributes.url,
                quantity,
              })
            )
          }
            >
            Quick Add
            </Button>
          </Overlay>
        </Box>
        <Box display="flex" justifyContent="flex-end" width="full" height="full" flexDirection="column" mt={1} p={2} >
          <Typography variant='body3' fontSize={16} fontWeight={600} mb={1} letterSpacing={2}>{item?.attributes.title}</Typography>
          <Typography variant='body3' fontSize={18} fontWeight={500} pb={1} letterSpacing={2}>{item?.attributes.size}</Typography>
          <Typography variant='body3' fontSize={17} fontWeight={400} mb={1} letterSpacing={1}>{item?.attributes.color}</Typography>
          <Typography variant='body2' fontWeight={800}>${item?.attributes.price}</Typography>
        </Box>
      </CardWrapper>
  );
};

export default Card;
