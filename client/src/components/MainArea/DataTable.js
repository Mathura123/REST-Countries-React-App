import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from "./style";

const columns = [
  { id: 'flag', label: 'Flag' },
  { id: 'name', label: 'Name' },
  { id: 'capital', label: 'Capital' },
  { id: 'region', label: 'Region' },
  { id: 'subregion', label: 'Sub Region' },
  { id: 'population', label: 'Population', align: 'right', format: (value) => value.toLocaleString('en-US')},
  { id: 'area', label: 'Size\u00a0(km\u00b2)', align: 'right', format: (value) => value.toLocaleString('en-US'),},
];

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const searchText = useSelector((state)=>state.search.searchString);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let sortedRow = props.rows;
  const initial = searchText !== "" ? 0 : page * rowsPerPage ; 
  const last = searchText !== "" ? -1 : page * rowsPerPage + rowsPerPage ;
  const sortingType = useSelector((state)=>state.sortingType.sortType);
  const sortingDetail = sortingType.split('_');
  const columnIndexSort = sortingDetail[0];
  const sortType = sortingDetail[1];

  let compareFunc;
  let sortingColumn;
  sortingColumn = columnIndexSort === '1' ? 
                  'name' : columnIndexSort === '2' ? 
                  'capital' : columnIndexSort === '3' ? 
                  'region' : columnIndexSort === '4' ? 
                  'subregion' : columnIndexSort === '5' ? 
                  'population' : columnIndexSort === '6' ? 
                  'area' : null;

  if(sortType==='A'){
    compareFunc= (a,b)=>{
      if ((a[sortingColumn])> (b[sortingColumn])) return 1;
      if ((a[sortingColumn])< (b[sortingColumn])) return -1;
    return 0;
    } 
  }
  else if(sortType==='D'){
    compareFunc= (a,b)=>{
      if ((a[sortingColumn])< (b[sortingColumn])) return 1;
      if ((a[sortingColumn])> (b[sortingColumn])) return -1;
    return 0;
    } 
  }
  
  sortedRow.sort(compareFunc)
  
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
            {sortedRow.slice(initial, last).map((row) => {
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
        count={sortedRow.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}