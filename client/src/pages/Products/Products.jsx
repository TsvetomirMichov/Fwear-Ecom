import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import ProductsMen from "../../assets/Mens-category-image.jpg"
import ProductsWomen from "../../assets/Womens-category-image.jpg"
import { Box, Button, Checkbox, Container, Drawer, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, Radio, RadioGroup, Slider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import MenuIcon from '@mui/icons-material/Menu';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import CloseIcon from '@mui/icons-material/Close';

function valuetext(value) {
  return `${value}°C`;
}

const Products = () => {
  const catType = useParams().type;
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState('asc');
  const [size, setSize] = useState('');
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  // const [expanded, setExpanded] = React.useState('panel1');

  // Drawer opne state
  const [open, setOpen] = useState(false);

  // Drawer hander functionality

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][type][$eq]=${catType}`
  );


  const handleChange = (e) => {
    const value = Number(e.target.value);
    const isChecked = e.target.checked;
    setSelectedSubCats(
      isChecked ?
        [...selectedSubCats, value] :
        selectedSubCats.filter((item) => item !== value)
    );
    // setSelectedSubCats([])
  };

  const handleReset = (e) => {
    setSelectedSubCats([])
    setMaxPrice(100)
    setSort('asc')
    setSize('')
  };

  const handlePriceChange = (event, newValue) => {
    setMaxPrice(newValue)
  };


  // console.log("Selected catg ",selectedSubCats)
  const BoxRight = styled(Box)(() => ({
    width: '100%',
    height: '100%',
    padding: '0.5em'
  }))

  const BoxLeft = styled(Box)(() => ({
    width: '50%',
    height: '100%',
    marginLeft: '1em',
  }))

  const BoxTop = styled(Box)(() => ({
    width: '15rem',
    justifyContent: 'space-between',
    marginLeft: '0.5em',

  }))

  const BoxImage = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    backgroundImage: catType === "men" ? `url(${ProductsMen})` : `url(${ProductsWomen})`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'end',
    color: 'white'

  }))
  // Accordeon styles

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  return (
    <Box sx={{ display: 'flex', margin: 0, p: 0, width: '100%', mt: 5 }} >
      {/* Left Side Bar */}
      <BoxLeft >
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: { xs: 'column', sm: 'flex' } }}>
            <BoxTop className="top">
              <Box className="filterItem">
                <Box display="flex" width="100%" mt="0.5em">
                  <Typography variant="h5" fontWeight={800} mb={1}>FILTER & SORT</Typography>
                </Box >
                <FormGroup>
                  {data?.map((item, index) =>
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          onChange={handleChange}
                          value={item.id}
                          checked={selectedSubCats.includes(item.id)}
                        />
                      }
                      label={item.attributes.title}
                    />
                  )}
                </FormGroup>

              </Box >
              <Box className="filterItem" sx={{ mt: 3 }}>
                <Typography variant="h5" fontWeight={800} mb={1}>Filter by price</Typography >
                <Box className="inputItem">
                  <span>0</span>
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={maxPrice}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    sx={{ width: '10em' }}

                  />
                  <span>{maxPrice}</span>
                </Box >
              </Box >
              <Box className="filterItem" sx={{ mt: 3 }}>
                <Typography variant="h5" fontWeight={800} mb={1} >Sort by</Typography >
                <Box className="inputItem">
                  <input
                    type="radio"
                    id="asc"
                    value="asc"
                    name="price"
                    onChange={(e) => setSort(e.target.value)}
                  />
                  <label htmlFor="asc">Price (Lowest first)</label>
                </Box >
                <Box className="inputItem">
                  <input
                    type="radio"
                    id="desc"
                    value="desc"
                    name="price"
                    onChange={(e) => setSort(e.target.value)}
                  />
                  <label htmlFor="desc">Price (Highest first)</label>
                </Box >
              </Box >
              <Box sx={{ mt: 3 }}>
                <Typography variant="h5" fontWeight={800} mb={1}>Sort by Size</Typography >
                <Box className="inputItem">
                  <input
                    type="checkbox"
                    id="Small"
                    value="Small"
                    name="size"
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <label htmlFor="Small">Small</label>
                </Box >
                <Box className="inputItem">
                  <input
                    type="checkbox"
                    id="Medium"
                    value="Medium"
                    name="size"
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <label htmlFor="Medium">Medium</label>
                </Box >
                <Box className="inputItem">
                  <input
                    type="checkbox"
                    id="Large"
                    value="Large"
                    name="size"
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <label htmlFor="Large">Large</label>
                </Box >

              </Box >
              <Button sx={{ my: 2 }} variant="outlined" onClick={handleReset}>Reset Search</Button>

            </BoxTop>
          </Box >
        </Box >
      </BoxLeft>
      {/* Left Side Bar */}

      <BoxRight >  {/* Right Side Bar */}
        <Box display={'flex'} sx={{ backgroundColor: '#ffe7cc', height: '25em', width: { xs: '90vw', sm: 'auto' }, mb: '2em' }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', m: 2 }}>
            <Typography sx={{ typography: { xs: 'h5', sm: 'h4' }, fontWeight: 900 }} pb={3} >
              {catType === "men" ? "MEN'S CLOATHING" : "WOMEN'S CLOATHING"}
            </Typography>
            <Typography sx={{ typography: { xs: 'h5', sm: 'h6' } }} flexDirection="row" >
              Save more with coupons & up to 70% off!
            </Typography>
          </Box >
          <BoxImage />
        </Box >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6" textTransform="capitalize"  >
              {catType}s
            </Typography>
            <Typography variant="h4" fontWeight={700} textTransform="capitalize" >
              All products
            </Typography>
          </Box >
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            {/* <IconButton edge="start" color="black" aria-label="menu"> */}
            <Button onClick={handleDrawerOpen} variant="outlined" startIcon={<MenuIcon />} sx={{ color: "black", borderColor: 'black', p: 1 }}  >
              Filter
            </Button>
            {/* </IconButton> */}
            <Drawer anchor="right" open={open} transitionDuration={100}>
              <BoxTop className="top">
                <Box className="filterItem">
                  <Box display="flex" width="100%" mt="0.5em">
                    <Button onClick={handleDrawerClose} sx={{ color: 'black' }}>
                      <CloseIcon sx={{ justifySelf: 'center', alignSelf: 'center' }} />
                    </Button>
                    <Typography width="100%" alignSelf="center" justifySelf="center" variant="body2" fontWeight={700} >FILTER & SORT</Typography>
                  </Box >
                  <FormGroup>
                  <Typography variant="h5" fontWeight={800} my={2}>Gategories</Typography >

                    {data?.map((item, index) =>
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            onChange={handleChange}
                            value={item.id}
                            checked={selectedSubCats.includes(item.id)}
                          />
                        }
                        label={item.attributes.title}
                      />
                    )}
                  </FormGroup>
                </Box >
                <Box className="filterItem" sx={{ mt: 3 }}>
                  <Typography variant="h5" fontWeight={800} mb={1}>Filter by price</Typography >
                  <Box className="inputItem">
                    <span>0</span>
                    <Slider
                      getAriaLabel={() => 'Temperature range'}
                      value={maxPrice}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      sx={{ width: '10em' }}

                    />
                    <span>{maxPrice}</span>
                  </Box >
                </Box >
                <Box className="filterItem" sx={{ mt: 3 }}>
                  <Typography variant="h5" fontWeight={800} mb={1} >Sort by</Typography >
                  <Box className="inputItem">
                    <input
                      type="radio"
                      id="asc"
                      value="asc"
                      name="price"
                      onChange={(e) => setSort(e.target.value)}
                    />
                    <label htmlFor="asc">Price (Lowest first)</label>
                  </Box >
                  <Box className="inputItem">
                    <input
                      type="radio"
                      id="desc"
                      value="desc"
                      name="price"
                      onChange={(e) => setSort(e.target.value)}
                    />
                    <label htmlFor="desc">Price (Highest first)</label>
                  </Box >
                </Box >
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h5" fontWeight={800} mb={1}>Sort by Size</Typography >
                  <Box className="inputItem">
                    <input
                      type="checkbox"
                      id="Small"
                      value="Small"
                      name="size"
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <label htmlFor="Small">Small</label>
                  </Box >
                  <Box className="inputItem">
                    <input
                      type="checkbox"
                      id="Medium"
                      value="Medium"
                      name="size"
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <label htmlFor="Medium">Medium</label>
                  </Box >
                  <Box className="inputItem">
                    <input
                      type="checkbox"
                      id="Large"
                      value="Large"
                      name="size"
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <label htmlFor="Large">Large</label>
                  </Box >
                </Box >
                <Button sx={{ my: 2 }} variant="outlined" onClick={handleReset}>Reset Search</Button>
              </BoxTop>
            </Drawer>
          </Box >
        </Box >
        <List catType={catType} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} size={size} />
      </BoxRight>   {/* Right Side Bar */}

    </Box >
  );
};

export default Products;
