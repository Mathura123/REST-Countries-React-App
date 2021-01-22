import { Header } from "./components/Header/Header";
import {  MainContent } from "./components/MainArea/MainContent";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storeCountryDetails } from "./redux";
import useStyles from "./style";

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(storeCountryDetails());
}, [dispatch])

  return (
    <div className={classes.page}>
      <Header className={classes.mainItem}/>
      <MainContent/>
    </div>
  );
}

export default App;
