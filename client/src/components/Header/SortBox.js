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
          <MenuItem value='1_A'>
            <em>Name Ascending</em>
          </MenuItem>
          <MenuItem value='1_D'>Name Descending</MenuItem>
          <MenuItem value='2_A'>Capital Ascending</MenuItem>
          <MenuItem value='2_D'>Capital Descending</MenuItem>
          <MenuItem value='3_A'>Region Ascending</MenuItem>
          <MenuItem value='3_D'>Region Descending</MenuItem>
          <MenuItem value='4_A'>Sub Region Ascending</MenuItem>
          <MenuItem value='4_D'>Sub Region Descending</MenuItem>
          <MenuItem value='5_A'>Population Ascending</MenuItem>
          <MenuItem value='5_D'>Population Descending</MenuItem>
          <MenuItem value='6_A'>Size Ascending</MenuItem>
          <MenuItem value='6_D'>Size Descending</MenuItem>
        </Select>
      </FormControl>
  );
}