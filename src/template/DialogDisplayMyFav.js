import * as React from 'react';
import './mycss.css';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function DisplayData(props) {
    let subjectData = props.jsonData.row
    return (
        <div className='container2'>
            <div>
                <img style={{ verticalAlign: "middle" }} src={subjectData.image} alt={subjectData.name} className="iconDetails" />
            </div>
            <div>
            <h2>{subjectData.name}</h2>
                <table style={{ verticalAlign: "top" }}>
                    <tbody>
                        <tr>
                            <td>Current Price (USD)</td>
                            <td>{subjectData.current_price}</td>
                        </tr>
                        <tr>
                            <td>Market Capital (Volume)</td>
                            <td>{subjectData.market_cap}</td>
                        </tr>
                        <tr>
                            <td>Market Capital Rank</td>
                            <td>{subjectData.market_cap_rank}</td>
                        </tr>
                        <tr>
                            <td>Fully Diluted Valuation (Volume)</td>
                            <td>{subjectData.fully_diluted_valuation}</td>
                        </tr>
                        <tr>
                            <td>Total Volume</td>
                            <td>{subjectData.total_volume}</td>
                        </tr>
                        <tr>
                            <td>High 24 Hour (USD)</td>
                            <td>{subjectData.high_24h}</td>
                        </tr>
                        <tr>
                            <td>Low 24 Hour (USD)</td>
                            <td>{subjectData.low_24h}</td>
                        </tr>
                        <tr>
                            <td>Price Change 24 Hour (USD)</td>
                            <td>{subjectData.price_change_24h}</td>
                        </tr>
                        <tr>
                            <td>Price Change 24 Hour (%)</td>
                            <td>{subjectData.price_change_percentage_24h}</td>
                        </tr>
                        <tr>
                            <td>Market Capital Change 24 Hour (Volume)</td>
                            <td>{subjectData.market_cap_change_24h}</td>
                        </tr>
                        <tr>
                            <td>Market Capital Change 24 Hour (%)</td>
                            <td>{subjectData.market_cap_change_percentage_24h}</td>
                        </tr>
                        <tr>
                            <td>Circulating Supply (Volume)</td>
                            <td>{subjectData.circulating_supply}</td>
                        </tr>
                        <tr>
                            <td>Total Supply (Volume)</td>
                            <td>{subjectData.total_supply}</td>
                        </tr>
                        <tr>
                            <td>Max Supply (Volume)</td>
                            <td>{subjectData.max_supply}</td>
                        </tr>
                        <tr>
                            <td>Last Updated</td>
                            <td>{subjectData.last_updated}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )



}

function DialogDisplayMyFav(props) {
    const { data, open, onClose, deleteFavourite } = props
    return <div>
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Detail
                    </Typography>
                   
                    <Button autoFocus color="inherit" onClick={() => deleteFavourite(data.row)}>
                        Delete favourite
                    </Button>
                </Toolbar>
            </AppBar>
            <DisplayData jsonData={data} />

        </Dialog>
    </div>
};

export default DialogDisplayMyFav;