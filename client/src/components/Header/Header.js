import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { SearchBox } from './SearchBox';
import { SortBox } from './SortBox'; 
import useStyles from "./style";

export function Header() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.grow}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Countries React App
          </Typography>
          <SearchBox/>
          <SortBox/>
        </Toolbar>
      </AppBar>
    </div>
  );
}