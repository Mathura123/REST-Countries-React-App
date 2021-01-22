import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import { sortByColumn } from '../../redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function ColumnSelector() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const sortingType = useSelector((state)=>state.sortingType.sortType);

  const handleChange = (event) => {
    dispatch(sortByColumn(event.target.value));
  };

  return (
    <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Sort By
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={sortingType}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value='1_S'>
            <em>Name</em>
          </MenuItem>
          <MenuItem value='2_S'>Capital</MenuItem>
          <MenuItem value='3_S'>Region</MenuItem>
          <MenuItem value='4_S'>Sub Region</MenuItem>
          <MenuItem value='5_N'>Population</MenuItem>
          <MenuItem value='6_N'>Size</MenuItem>
        </Select>
      </FormControl>
  );
}