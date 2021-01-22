import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import DataTable from "./DataTable";

export const MainContent= () => {
  const countries = useSelector((state)=>state.countiesDetails.countries);
  const rows = countries.map((country)=>createData(country));  

  function createData(country) {
    let flag = <img src = {country.flag} alt="flag" width="50" height="40"/>
    let name = country.name;
    let capital = country.capital;
    let region = country.region;
    let subregion = country.subregion;
    let population = country.population;
    let area = country.area;
    return { flag, name, capital, region, subregion, population, area };
  }

  return (
      !countries.length ? <CircularProgress/>:(
    <Grid container alignItems="stretch" spacing={3}>
      <DataTable rows={rows}/>
    </Grid>

      )
  );
};
