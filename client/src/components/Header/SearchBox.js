import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import useStyles from "./style";
import { useDispatch } from 'react-redux';
import { doSearch } from "../../redux";

export const SearchBox = (props) => {
    const classes= useStyles();
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        dispatch(doSearch(e.target.value));
    }

    return (
        <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange = {handleSearch}
        />
      </div>
    );
  };