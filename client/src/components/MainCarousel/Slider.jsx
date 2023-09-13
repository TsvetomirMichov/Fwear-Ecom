import { Box, Typography, IconButton, useMediaQuery, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ResponsiveSliderImage from '../../assets/slider-responsive/ResponsiveSliderImage2.png'
import ResponsiveSliderImage2 from '../../assets/slider-responsive/ResponsiveSliderImage1.png'


const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets/slider", false, /\.(png|jpe?g|svg)$/)
);

const slidesData = [
  {
    title: "LIMITED TIME ONLY *",
    subtitle: "SUMMER",
    subTitle:"SALE",
    salesOption: "UP TO 50% OFF",
    imgSrc: ResponsiveSliderImage2
  },
  {
    title: "SUMMER 2023",
    subtitle: "SHORTS&",
    subTitle:"JACKETS",
    salesOption: "DISCOVER MORE",
    imgSrc: ResponsiveSliderImage
  },
  // Add more slides data here...
];

const SliderCorosel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Carousel
     
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "40%",
            left: "0",
            color: "black",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "black",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={isNonMobile ? texture : slidesData[index].imgSrc}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height:"100%",
              objectFit: "cover",
            }}
          />
          <Box
            color="white"
            padding="1em"
            borderRadius="1px"
            textAlign="left"
            position="absolute"
            top="25%"
            height={'100%'}
            left={isNonMobile ? "10%" : "1px"}
            right={isNonMobile ? undefined : ""}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? "25em" : "30em"}
          >
            <Typography
              color="#504F4F"
           
              sx={{ fontSize: { xs: "1.3em", sm: "1.5em",paddingLeft:10,fontWeight:'bold' }}}
            >
              {slidesData[index].title}
            </Typography>
            <Typography sx={{ fontSize: { xs: "3em", sm: "5em" },color:'#D16666',fontWeight:600 }}>
              {slidesData[index].subtitle}
            </Typography>
            <Typography sx={{ fontSize: { xs: "3em", sm: "8em" },color:'#D16666',fontWeight:600 }}>
              {slidesData[index].subTitle}
            </Typography>
            <Typography sx={{ fontSize: { xs: "1.3em", sm: "1.5em" }, color:"#504F4F",fontWeight:600 }}>
              {slidesData[index].salesOption}
            </Typography>
            
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default SliderCorosel;
