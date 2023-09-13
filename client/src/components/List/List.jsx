import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import { Grid } from "@mui/material";

const List = ({ subCats, maxPrice, sort, catType ,size}) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][title]=${catType}${subCats.map( 
      (item) => `&[filters][sub_categories][id][$eqi]=${item}`
    )}&[filters][price][$lt]=${maxPrice}&sort=price:${sort}${size !=='' ?`&[filters][size][$eq]=${size}`:''}`
  );

  return (
    <div className="list">
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 3, md: 12 }}>
        {error ? "Something went wrong" : loading ? "Loading products" : data.map((item,index) =>
          <Grid key={index}
            item xs={4} sm={4} md={4} lg={3} xl={3} flexBasis={{ sm: 'flex-col', md: 'flex-col' }}>
            <Card item={item} key={item.id} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

 export default List;

