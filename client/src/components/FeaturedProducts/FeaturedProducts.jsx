import React from "react";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import { Grid, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const FeaturedProducts = ({ type }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, loading, error } = useFetch(
    `/products?filters[type][$eq]=${type}&populate=*&${value !== "" ? `&[filters][categories][type][$eqi]=${value}` : ''}`
  );

  data.length = 4

  return (
    <Box className="featuredProducts" flexGrow={1} my={'5em'}>
      <Box>
        <Typography variant="h4" textTransform="uppercase" color='black' textAlign={'center'}>{type} products</Typography>
      </Box>
      <Box sx={{ width: '100%', typography: 'body1', alignContent: 'center', justifyContent: 'center' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'gray', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <TabList textColor="secondary"
              indicatorColor="secondary" onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All" value="" />
              <Tab label="MEN" value="men" />
              <Tab label="WOMEN" value="women" />
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {error ? "Something went wrong" : loading ? <Skeleton variant="rectangular" width={210} height={118} /> : data.map((item, index) =>
          <Grid
            item xs={4} sm={4} md={3} lg={3} xl={3} flexBasis={{ sm: 'flex-col', md: 'flex-col' }} key={index}>
            <Card item={item} key={item.id} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FeaturedProducts;