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
  // const [sortedRow, setSortedRow] = React.useState(props.rows);
  let sortedRow = props.rows;
  const initial = searchText !== "" ? 0 : page * rowsPerPage ; 
  const last = searchText !== "" ? -1 : page * rowsPerPage + rowsPerPage ;
  const sortingType = useSelector((state)=>state.sortingType.sortType);
  const sortingDetail = sortingType.split('_');
  const columnIndexSort = sortingDetail[0];
  const sortType = sortingDetail[1];

  let compareFunc;
  let sortingColumn;
  if(columnIndexSort === '1'){
    sortingColumn='name'
  }
  else if(columnIndexSort === '2'){
    sortingColumn='capital'
  }
  else if(columnIndexSort === '3'){
    sortingColumn='region'
  }
  else if(columnIndexSort === '4'){
    sortingColumn='subregion'
  }
  else if(columnIndexSort === '5'){
    sortingColumn='population'
  }
  else if(columnIndexSort === '6'){
    sortingColumn='area'
  }
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
  function compareAscending(a, b) {
    console.log(a.sortingColumn-b.sortingColumn);
    
  }
  function compareDescending(a, b) {
    console.log(a.sortingColumn-b.sortingColumn);
    if (((a.sortingColumn)- (b.sortingColumn))>0) return 1;
    if (((a.sortingColumn)- (b.sortingColumn))<0) return -1;
  
    return 0;
  }
  
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