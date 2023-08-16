//@ts-ignore
import {  getData } from '../utils/getData.ts';
import styles from './main.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate  } from 'react-router-dom';
import { CoinContext} from '../App.js';
import addImg from '../images/add.png'
//@ts-ignore
import AddCoin from '../components/addCoin.tsx';


const Main = ({briefcaseActive, setBriefcaseActive}) => {

    const [coins, setCoins] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(20);
    const navigate = useNavigate();
    const {coin, setCoin} = useContext<any>(CoinContext);
    const [inModal, setInModal] = useState(null);
    
    const [addCoinActive, setaddCoinActive] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(currentPage);
            setCoins(data.data);
        }
        if(currentPage) {
            fetchData();     
        }    
        console.log(coin);
    }, [currentPage]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [])

    const scrollHandler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1) {
            setCurrentPage(prevState => prevState + 20);
        }
    }

    const handleClick = (item) => {
        setCoin(item);
        navigate(`/coin/:${item.rank}`);
    }

    const forwardModal = (item) => {
        setInModal(item)
    }
    

    return (
        <>
            <TableContainer className={styles.container} component={Paper}>
                <Table className={styles.table}  sx={{ minWidth: 650, }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                        <TableCell className={styles.header}></TableCell>
                            <TableCell className={styles.header}>Name</TableCell>
                            <TableCell align="right" className={styles.header}>Price</TableCell>
                            <TableCell align="right" className={styles.header}>Market Cap</TableCell>
                            <TableCell align="right" className={styles.header}>VWAP(24Hr)</TableCell>
                            <TableCell align="right" className={styles.header}>volume(24Hr)</TableCell>
                            <TableCell align="right" className={styles.header}>Change(24Hr)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coins?.map((item) => (
                            <TableRow
                            onClick={() => handleClick(item)}
                            className={styles.row}
                            key={item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >      
                                <TableCell component="th" scope="row">
                                    <button 
                                        className={styles.btn}
                                        onClick={(e) => {setaddCoinActive(true); e.stopPropagation(); forwardModal(item); }}
                                        >
                                        <img id={styles.img} src={addImg} alt="#" />
                                    </button>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">${parseFloat(item.priceUsd).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    {(String(parseInt(item.marketCapUsd)).length > 6 && String(parseInt(item.marketCapUsd)).length < 10) ?
                                    ((parseInt(item.marketCapUsd)/ Math.pow(10, 6)).toFixed(2) + "m") :
                                    ((String(parseInt(item.marketCapUsd)).length >= 10 && String(parseInt(item.marketCapUsd)).length < 13) ? 
                                    ((parseInt(item.marketCapUsd) / Math.pow(10, 9)).toFixed(2) + "b") : parseInt(item.marketCapUsd))}
                                </TableCell>
                                <TableCell align="right">${parseFloat(item.vwap24Hr).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                ${(String(parseInt(item.volumeUsd24Hr)).length > 6 && String(parseInt(item.volumeUsd24Hr)).length < 10) ?
                                    ((parseInt(item.volumeUsd24Hr)/ Math.pow(10, 6)).toFixed(2) + "m") :
                                    ((String(parseInt(item.volumeUsd24Hr)).length >= 10 && String(parseInt(item.volumeUsd24Hr)).length < 13) ? 
                                    ((parseInt(item.volumeUsd24Hr) / Math.pow(10, 9)).toFixed(2) + "b") : parseInt(item.volumeUsd24Hr))}
                                </TableCell>
                                <TableCell align="right">{parseFloat(parseFloat(item.changePercent24Hr).toFixed(3)).toFixed(2)}%</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddCoin value={inModal} active={addCoinActive} setActive={setaddCoinActive} />
        </>    
    )
}

export default Main;