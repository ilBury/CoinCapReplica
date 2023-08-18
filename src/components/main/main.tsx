
import {  getData } from '../../utils/getData';
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
import { CoinContext} from '../../App';
import addImg from '../../images/add.png'

import AddCoin from '../../components/addCoin/addCoin';


const Main = () => {

    const [coins, setCoins] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(20);
    const navigate = useNavigate();
   
    const {setCoin} = useContext<any>(CoinContext);
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
  
    }, [currentPage]);
    

    const checkPrice = (val: any) => {
        const reg = /0[.]0+[0-9]+/gm;
        if(reg.test(val)) {
            return val.match(/0[.]0+[0-9]/gm)[0]; 
        } else {
            return parseFloat(val).toFixed(2);
        }  
    }


    useEffect(() => {
       
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [])

    const scrollHandler = (e: any) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1) {
            setCurrentPage(prevState => prevState + 20);
        }
    }

    const handleClick = (item: any) => {
        setCoin(item)
        navigate(`/coin/:${item.rank}`);
    }

    const forwardModal = (item: any) => {
        setInModal(item)
    }
    

    return (
        <>
            <TableContainer className={styles.container} component={Paper}>
                <Table className={styles.table}  sx={{ minWidth: 300, }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                        <TableCell className={styles.header}></TableCell>
                            <TableCell className={styles.header}>Name</TableCell>
                            <TableCell align="right" className={styles.header}>Price</TableCell>
                            <TableCell align="right" className={styles.header + " " + styles.block}>Market Cap</TableCell>
                            <TableCell align="right" className={styles.header + " " + styles.block}>VWAP(24Hr)</TableCell>
                            <TableCell align="right" className={styles.header + " " + styles.block}>volume(24Hr)</TableCell>
                            <TableCell align="right" className={styles.header + " " + styles.block}>Change(24Hr)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coins?.map((item: any) => (
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
                                <TableCell align="right">${checkPrice(item.priceUsd)}</TableCell>
                                <TableCell align="right" className={styles.block} >
                                    {(String(parseInt(item.marketCapUsd)).length > 6 && String(parseInt(item.marketCapUsd)).length < 10) ?
                                    ((parseInt(item.marketCapUsd)/ Math.pow(10, 6)).toFixed(2) + "m") :
                                    ((String(parseInt(item.marketCapUsd)).length >= 10 && String(parseInt(item.marketCapUsd)).length < 13) ? 
                                    ((parseInt(item.marketCapUsd) / Math.pow(10, 9)).toFixed(2) + "b") : parseInt(item.marketCapUsd))}
                                </TableCell>
                                <TableCell align="right" className={styles.block}>${parseFloat(item.vwap24Hr).toFixed(2)}</TableCell>
                                <TableCell align="right" className={styles.block}>
                                ${(String(parseInt(item.volumeUsd24Hr)).length > 6 && String(parseInt(item.volumeUsd24Hr)).length < 10) ?
                                    ((parseInt(item.volumeUsd24Hr)/ Math.pow(10, 6)).toFixed(2) + "m") :
                                    ((String(parseInt(item.volumeUsd24Hr)).length >= 10 && String(parseInt(item.volumeUsd24Hr)).length < 13) ? 
                                    ((parseInt(item.volumeUsd24Hr) / Math.pow(10, 9)).toFixed(2) + "b") : parseInt(item.volumeUsd24Hr))}
                                </TableCell>
                                <TableCell align="right" className={styles.block}>{parseFloat(parseFloat(item.changePercent24Hr).toFixed(3)).toFixed(2)}%</TableCell>
                                
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