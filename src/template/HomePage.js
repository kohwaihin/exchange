import * as React from 'react';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DialogDisplay from './DialogDisplay';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HomePage = () => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)
  const openDialog = () => setDialogIsOpen(true)
  const closeDialog = () => setDialogIsOpen(false)
  const [rowData, setRowData] = React.useState({})

  const [exchangeData, setExchangeData] = React.useState([])
  const [exchangeName, setExchangeName] = React.useState("");
  const [dataToDisplay, setDataToDisplay] = React.useState([])


  const saveAsFavourite = (data) => {
    var items = JSON.parse(localStorage.getItem('myfavourite'))
    let currentID = data.id;
    var myData = []
    items = items == null ? myData : items
    if (items.indexOf(currentID) > -1) {
      // do nothing
    } else {
      myData = [...items]
      myData.push(currentID)
      localStorage.setItem('myfavourite', JSON.stringify(myData));
    }
    alert("Successfully saved!");
    return true;
  }

  const deleteFavourite = (data) => {
    console.log(data)
    var fav = JSON.parse(localStorage.getItem('myfavourite'))
    var myData = [];
    fav = fav == null ? myData : fav
    myData = [...fav]

    let myIndex = myData.indexOf(data.id);
    if (myIndex > -1) {
    
      myData.splice(myIndex, 1);
      localStorage.setItem('myfavourite', JSON.stringify(myData));
    }
    alert("Successfully removed!");
    return true;
  }

  const handleInput = (e) => {
    const keyword = e.target.value.toLowerCase();
    if (keyword === '') {
      setDataToDisplay(exchangeData);
    } else {
      const results = exchangeData.filter((item) => {
        return item.name.toLowerCase().includes(keyword);
      });
      setDataToDisplay(results);
    }
    setExchangeName(keyword)
  };

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=MYR&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    fetch(url).then((response) => {
      response.json().then((datas) => {
        setExchangeData(datas)
        setDataToDisplay(datas)
      })
    })

  }, [])



  const columns = [
    {
      field: 'name', headerName: 'Name', minWidth: '200', renderCell: (params) => {

        return (
          <div>
            <img style={{ verticalAlign: "middle" }} src={params.row.image} alt={params.row.name} width="30" height="30" />
            <span>  {params.row.name} <Link to={`/ExchangeDetail/${params.row.id}`}>Info</Link></span>
           </div>
        )
      }
    },
    { field: 'current_price', headerName: 'Current Price (USD)', minWidth: '150' },
    { field: 'high_24h', headerName: 'High 24 Hour', minWidth: '120' },
    { field: 'low_24h', headerName: 'Low 24 Hour', minWidth: '120' },
    {
      field: 'price_change_24h', headerName: 'Price Change 24 Hour', minWidth: '150', renderCell: (params) => {
        return (
          <div style={params.row.price_change_24h > 0 ? { color: "green" } : { color: "red" }}>
            {params.row.price_change_24h}
          </div>
        )
      }
    },
    {
      field: 'price_change_percentage_24h', headerName: 'Price change % 24 hour', minWidth: '150', renderCell: (params) => {
        return (
          <div style={params.row.price_change_percentage_24h > 0 ? { color: "green" } : { color: "red" }}>
            {params.row.price_change_percentage_24h}
          </div>
        )
      }
    },
    { field: 'market_cap', headerName: 'Market Capital', minWidth: '130' },
    { field: 'total_volume', headerName: 'Market Capital', minWidth: '130' },
    { field: 'last_updated', headerName: 'Last Update', minWidth: '150' },
  ];


  return (
    <>
      <h1>All Exchange</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="🔎 Search" variant="outlined"
          value={exchangeName}
          onChange={handleInput} width="1000 px" />
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={dataToDisplay}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          onRowClick={(rowInfo) => {
            setRowData(rowInfo)
            setDialogIsOpen(true)
          }
          }
        />
      </div>

      <DialogDisplay data={rowData} open={dialogIsOpen} onClose={closeDialog} saveAsFavourite={saveAsFavourite} deleteFavourite={deleteFavourite}/>
    </>
  );
};

export default HomePage;