import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';

const columns = [
  { id: 'flag', label: 'Flag' },
  { id: 'name', label: 'Name' },
  { id: 'capital', label: 'Capital' },
  { id: 'region', label: 'Region' },
  { id: 'subregion', label: 'Sub Region' },
  // { id: 'code', label: 'ISO\u00a0Code' },
  { id: 'population', label: 'Population', align: 'right', format: (value) => value.toLocaleString('en-US')},
  { id: 'area', label: 'Size\u00a0(km\u00b2)', align: 'right', format: (value) => value.toLocaleString('en-US'),},
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const searchText = useSelector((state)=>state.search.searchString);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const initial = searchText !== "" ? 0 : page * rowsPerPage ; 
  const last = searchText !== "" ? -1 : page * rowsPerPage + rowsPerPage ;
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.slice(initial, last).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if(searchText !== "" &&  row.name.toLowerCase().indexOf(searchText.toLowerCase())===-1 
                    &&  row.capital.toLowerCase().indexOf(searchText.toLowerCase())===-1
                    &&  row.region.toLowerCase().indexOf(searchText.toLowerCase())===-1
                    &&  row.subregion.toLowerCase().indexOf(searchText.toLowerCase())===-1
                    &&  row.population.toString().indexOf(searchText)===-1){
                      return null
                  }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}