import React, { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../App';
import styles from './coin.module.scss'
import rankImg from '../images/rank.svg'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
//@ts-ignore
import { getHistory } from '../utils/getData.ts';


interface Coordinate {
    name: string,
    uv: number
}

const Coin = ({ route }) => {
    
    const {coin, setCoin} = useContext<any>(CoinContext);
    const [history, setHistory] = useState<any>(null);
    const [val, setVal] = useState<Coordinate[]>([]);
    
    
    useEffect(() => {

        if(coin) {
            localStorage.setItem('coin', JSON.stringify(coin));
            localStorage.setItem('id', coin.id);
        } else {
            const val = localStorage.getItem('coin');
            setCoin(JSON.parse(val!));
            
        }
        
    })
    


    useEffect(() => {

        const fetchData = async (id: string) => {
            const data = await getHistory(id);
            setHistory(data.data);
        }

        if(!history){
            coin ? fetchData(coin.id) : fetchData(localStorage.getItem('id')!)
            
        } 
     
        
        
        
    }, [history])


    useEffect(() => {
        let copy = Object.assign([], val);
        for(let item in history) { 
            copy.push({name: String(history[item].time), uv: parseFloat(history[item].priceUsd)} );    
        }
        if(!val.length) setVal(copy);
        
    }, [val])

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.rank}>
                    <img src={rankImg} alt="#" />
                    <span className={styles.digital}>{coin ? coin.rank : 'Load...'}</span>
                    <span className={styles.desc}>Rank</span>
                </div>
                <div className={styles.wrapper} >
                    <span style={{fontSize: 26, fontWeight: 600}}>{coin ? coin.name +  `\t(${coin.symbol})` : 'Loading...'}</span>
                    <span>{coin ? '$' + parseFloat(coin.priceUsd).toFixed(2) : 'Loading...'}</span>
                </div>
                <div className={styles.wrapper}>
                    <span>Market Cap</span>
                    <span>{coin ? (String(parseInt(coin.marketCapUsd)).length > 6 && String(parseInt(coin.marketCapUsd)).length < 10) ?
                                ((parseInt(coin.marketCapUsd)/ Math.pow(10, 6)).toFixed(2) + "m") :
                                ((String(parseInt(coin.marketCapUsd)).length >= 10 && String(parseInt(coin.marketCapUsd)).length < 13) ? 
                                ((parseInt(coin.marketCapUsd) / Math.pow(10, 9)).toFixed(2) + "b") : parseInt(coin.marketCapUsd)) :
                                'Loading...'}</span>
                </div>
                <div className={styles.wrapper}>
                    <span>Volume (24Hr)</span>
                    <span>{coin ?  (String(parseInt(coin.volumeUsd24Hr)).length > 6 && String(parseInt(coin.volumeUsd24Hr)).length < 10) ?
                                ('$' + (parseInt(coin.volumeUsd24Hr)/ Math.pow(10, 6)).toFixed(2) + "m") :
                                ((String(parseInt(coin.volumeUsd24Hr)).length >= 10 && String(parseInt(coin.volumeUsd24Hr)).length < 13) ? 
                                ('$' + (parseInt(coin.volumeUsd24Hr) / Math.pow(10, 9)).toFixed(2) + "b") : '$' + parseInt(coin.volumeUsd24Hr)) : 'Loading...'}</span>
                </div>
                <div className={styles.wrapper}>
                    <span>Supply</span>
                    <span>{coin ? (String(parseInt(coin.supply)).length > 6 && String(parseInt(coin.supply)).length < 10) ?
                                ((parseInt(coin.supply)/ Math.pow(10, 6)).toFixed(2) + "m") :
                                ((String(parseInt(coin.supply)).length >= 10 && String(parseInt(coin.supply)).length < 13) ? 
                                ((parseInt(coin.supply) / Math.pow(10, 9)).toFixed(2) + "b") : parseInt(coin.supply)) : 'Loading...'}</span>
                </div>
            </div>

            <div className={styles.chart}>
                <LineChart startAngle={1000} width={600} height={300} data={val}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
            </div>
        </div>
    )
 
}


export default Coin;