import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './mycss.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columnName = ["Category/Currency", "aed", "ars", "aud", "bch", "bdt", "bhd", "bmd", "bnb", "brl", "btc", "cad", "chf", "clp", "cny", "czk", "dkk", "dot", "eos", "eth", "eur", "gbp", "hkd", "huf", "idr", "ils", "inr", "jpy", "krw", "kwd", "lkr", "ltc", "mmk", "mxn", "myr", "ngn", "nok", "nzd", "php", "pkr", "pln", "rub", "sar", "sek", "sgd", "thb", "try", "twd", "uah", "usd", "vef", "vnd", "xag", "xau", "xdr", "xlm", "xrp", "yfi", "zar", "bits", "link", "sats"];

function DisplayDescription(props) {
  var subjectData = props.data;

  if (subjectData.id === undefined) {
    return ""
  }

  return (
    <div className='container2'>
      <div>
        <img style={{ verticalAlign: "middle" }} src={subjectData.image["large"]} alt={subjectData.id} className="iconDetails" />
      </div>
      <div>
        <h2>{subjectData.localization["en"]}</h2>
        <div dangerouslySetInnerHTML={{ __html: subjectData.description["en"] }} />
      </div>
    </div>
  );

}


function getData(name, subjectData) {
  var current_price = { title: 'Curent Price', ...subjectData.market_data["current_price"] };
  var high_24h = { title: 'High 24 Hour', ...subjectData.market_data["high_24h"] };
  var low_24h = { title: 'Low 24 Hour', ...subjectData.market_data["low_24h"] };
  var price_change_24h_in_currency = { title: 'Price Change 24 Hour', ...subjectData.market_data["price_change_24h_in_currency"] };
  var price_change_percentage_1h_in_currency = { title: 'Price Change 1 Hour (%)', ...subjectData.market_data["price_change_percentage_1h_in_currency"] };
  var price_change_percentage_24h_in_currency = { title: 'Price Change 24 Hour (%)', ...subjectData.market_data["price_change_percentage_24h_in_currency"] };
  var price_change_percentage_7d_in_currency = { title: 'Price Change 7 Days (%)', ...subjectData.market_data["price_change_percentage_7d_in_currency"] };
  var price_change_percentage_14d_in_currency = { title: 'Price Change 14 Days (%)', ...subjectData.market_data["price_change_percentage_14d_in_currency"] };
  var price_change_percentage_30d_in_currency = { title: 'Price Change 30 Days (%)', ...subjectData.market_data["price_change_percentage_30d_in_currency"] };
  var price_change_percentage_60d_in_currency = { title: 'Price Change 60 Days (%)', ...subjectData.market_data["price_change_percentage_60d_in_currency"] };
  var price_change_percentage_200d_in_currency = { title: 'Price Change 200 Days (%)', ...subjectData.market_data["price_change_percentage_200d_in_currency"] };
  var price_change_percentage_1y_in_currency = { title: 'Price Change 1 Year (%)', ...subjectData.market_data["price_change_percentage_1y_in_currency"] };
  var market_cap = { title: 'Market Capital', ...subjectData.market_data["market_cap"] };
  var market_cap_change_24h_in_currency = { title: 'Market Capital Change 24 Hour', ...subjectData.market_data["market_cap_change_24h_in_currency"] };
  var market_cap_change_percentage_24h_in_currency = { title: 'Market Capital 24 Hour (%)', ...subjectData.market_data["market_cap_change_percentage_24h_in_currency"] };
  var total_volume = { title: 'Total Volume', ...subjectData.market_data["total_volume"] };

  return [
    current_price,
    high_24h,
    low_24h,
    price_change_24h_in_currency,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_14d_in_currency,
    price_change_percentage_30d_in_currency,
    price_change_percentage_60d_in_currency,
    price_change_percentage_200d_in_currency,
    price_change_percentage_1y_in_currency,
    market_cap,
    market_cap_change_24h_in_currency,
    market_cap_change_percentage_24h_in_currency,
    total_volume
  ];
}


function DisplayMarketData(props) {
  var subjectData = props.data;


  if (subjectData.id === undefined) {
    return ""
  }

  var rows = getData("something", subjectData);
  var currencyOnly = [...columnName]
  currencyOnly.splice(0, 1);

  return (
    <TableContainer component={Paper} style={{
      maxHeight: 500,
      width: 'auto'
    }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              columnName.map((x, k) => (
                <TableCell align="right" key={k}><b>{x.toUpperCase()}</b></TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell component="th" scope="row">
              <b>{row.title}</b>
              </TableCell>

              {
                currencyOnly.map((x, k) => (
                  <TableCell align="right" scope="row" key={k}>
                    {row[x]}
                  </TableCell>
                ))
              }

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}

const ExchangeDetail = () => {
  const [data, setData] = React.useState({})
  const params = useParams()

  console.log(params.exchange_id)

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/coins/" + params.exchange_id;
    console.log(url)
    fetch(url).then((response) => {
      response.json().then((datas) => {
        setData(datas)
      })
    })

  }, [])


  return (
    <>
      <h1>Exchange Detail</h1>
      <DisplayDescription data={data} />
      <h1>Market Data</h1>
      <DisplayMarketData data={data} />
    </>
  );
};

export default ExchangeDetail;