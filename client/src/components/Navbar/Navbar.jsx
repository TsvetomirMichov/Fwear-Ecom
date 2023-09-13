import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import { Autocomplete, Menu, MenuItem, MenuList, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, ListItem, ListItemIcon, ListItemText, List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { createClient } from '@supabase/supabase-js'

import FwearLogo from '../../assets/FwearLogo-preview.png'

const LogoBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

const LogoLink = styled(Link)(() => ({
  display: 'flex',
  color: 'black',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  justifyItems: 'center',
  fontSize: '2em',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '0.5em',
  letterSpacing: 3,

}));

const StyledList = styled(List)({
  width: "70vw",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
});

const CategoryBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: "none"
  }
}))

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpened] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const products = useSelector((state) => state.cart.products);
  
  const { data } = useFetch(`/products?populate=*`);
  const [options, setOptions] = useState([])
  let navigate = useNavigate()
  
  useEffect(() => {
    setOptions(data)
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAutoCompleteRedirect = (_, value, reason) => {
    if (reason === "selectOption") {
      navigate(`/product/${value?.id}`);
    } else if (reason === "reset") {
      return;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} width="100%" >
      <AppBar position="static" sx={{ display: 'flex', backgroundColor: 'white', maxWidth: '100vw', p: 0, m: 0 }}>
        <Toolbar sx={{ justifyContent: 'space-between ', maxWidth: '100vw', overflow: 'hidden', p: 0, m: 0 }}>
          <Box display='flex' sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }} >
            <IconButton edge="start" color="black" aria-label="menu" onClick={handleDrawerOpen} sx={{ display: { xs: 'block', sm: 'none' }, ml: 0, p: 0 }}>
              <MenuIcon />
            </IconButton>
            <IconButton size="large" aria-label="Men">
                <Typography variant="h6" color="black" noWrap  display={{ xs: 'none', sm: 'block', md: 'block' }}>
                  <Link className="link" to="/" ><img src={FwearLogo} style={{width:'4em',height:'auto',objectFit:'cover'}} alt="fwear" /></Link>
                </Typography>
              </IconButton>
            <CategoryBox  display={{ xs: 'none', sm: 'none', md: 'block' }} >
             
              <IconButton size="large" aria-label="Men">
                <Typography variant="h6" color="black" noWrap>
                  <Link className="link" to="/products/men">Men</Link>
                </Typography>
              </IconButton>
              <IconButton size="large" aria-label="Women">
                <Typography variant="h6" noWrap color="black">
                  <Link className="link" to="/products/women">Women</Link>
                </Typography>
              </IconButton>
            </CategoryBox>
          </Box>
          <Box display='flex'>
            <LogoBox  >
              <LogoLink to="/" >
                FWEAR
              </LogoLink>
            </LogoBox>
          </Box>
          <Box sx={{ display: { xs: 'flex', sm: "flex", md: 'flex' }, alignItems: 'center' }} gap={1}>

            {/* Account Settings */}

            {/* <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={accountOpen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={accountOpen ? 'true' : undefined}
              >
                <AccountCircleIcon sx={{ width: 32, height: 32, color: 'black' }}>M</AccountCircleIcon>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={accountOpen}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {
                user ?
                  <MenuList>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Hi,{user.email}
                    </MenuItem>
                    <MenuItem onClick={handleLogoutAndClose}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </MenuList>
                  :
                  <MenuList>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <Link to={'/login'} translate='none'>
                        Login
                      </Link>
                    </MenuItem>
                  </MenuList>
              }
            </Menu> */}

            {/* Account Settings */}

            <Autocomplete
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              getOptionLabel={(options) => `${options?.attributes?.title}`}
              options={options}
              sx={{ width: '10em', display: { xs: 'none', sm: 'block' } }}
              renderOption={(props, options) => (
                <Box component="li" {...props} key={options.id} >
                  {options?.attributes?.title}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} label="Search produc" />}
              //  onKeyDown={handleAutoCompleteRedirect(inputValue)}
              onChange={handleAutoCompleteRedirect}
            />
            <IconButton size="large" aria-label="Cart" onClick={() => setCartOpened(!cartOpen)} >
              <Badge badgeContent={products.length} color="secondary">
                <ShoppingCartIcon sx={{ color: "black" }} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose} sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' } }}>
        <Autocomplete
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          getOptionLabel={(options) => `${options?.attributes?.title}`}
          options={options}
          sx={{ width: '15em', display: { xs: 'block', sm: 'none' }, mx: 'auto', my: '.5em' }}
          renderOption={(props, options) => (
            <Box component="li" {...props} key={options.id} sx={{
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }} >
              {options?.attributes?.title}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Search produc" />}
          //  onKeyDown={handleAutoCompleteRedirect(inputValue)}
          onChange={handleAutoCompleteRedirect}
        />
        <StyledList>
          <ListItem button key="Home">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <StyledLink to="/" >
              <ListItemText primary="Home" />
            </StyledLink>
          </ListItem>
          <ListItem button key="About">
            <ListItemIcon><ManIcon /></ListItemIcon>
            <StyledLink to="/products/men" >
              <ListItemText primary="Men" />
            </StyledLink>
          </ListItem>
          <ListItem button key="Contact">
            <ListItemIcon><WomanIcon /></ListItemIcon>
            <StyledLink to="/products/women" >
              <ListItemText primary="Women" />
            </StyledLink>
          </ListItem>
        </StyledList>
      </Drawer>
      {cartOpen && <Cart />}
    </Box>
  );
};

export default Navbar;
