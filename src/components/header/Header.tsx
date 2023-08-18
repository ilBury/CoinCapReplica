import React, { useEffect, useState } from "react";

import styles from './Header.module.scss'
import briefCaseImg from '../../images/briefcase.png'

import { getCoin, getData } from "../../utils/getData";

import { Coin } from "../../utils/type";

import BriefCase from "../briefcase/briefcase";



const Header = () => {

    const [coins, setCoins] = useState<Coin[]>(null!)
    const [briefcaseActive, setBriefcaseActive] = useState<boolean>(false);
    const [price, setPrice] = useState(0);
    const [costDifference, setConstDifference] = useState(0);
    const [percentDifference, setPercentDifference] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(3);
            setCoins(data.data);       
        }
        if(!coins) {
            fetchData();
        }   
       
    }, [coins])
   
   
    useEffect(() => {  
        costDifferences()
    },[price])

    const checkPrice = (val: any) => {
        const reg = /0[.]0+[0-9]+/gm;
        if(reg.test(val)) {
            return val.match(/0[.]0+[0-9]/gm)[0]; 
        } else {
            return parseFloat(val).toFixed(2);
        }  
    }

    const costDifferences = () => {
        let apiCost: number = 0;   
        let briefcaseCost = 0;
        JSON.parse(localStorage.getItem('coin_in_briefcase')!).forEach((el: any) => {
            const fetchData = async () => {
                const data = await getCoin(el.coin.id);
                apiCost += Number(parseFloat(data.data[0].priceUsd) * el.amount);
                briefcaseCost += parseFloat(el.coin.priceUsd) * el.amount;
                setConstDifference(apiCost - briefcaseCost);
                setPercentDifference((100 * briefcaseCost) / apiCost - 100)
            }
            if(!coins) {
                fetchData();
            }  
        })

    }

    return (
        <>
            <header className={styles.header} >
                <div className={styles.coins + " " + styles.block} >
                    {coins ? 
                        coins.map((item, i) => (
                            <div key={i.toString()}>{item.name}: ${parseFloat(item.priceUsd).toFixed(2)}</div>
                        )) : (
                            <div>Loading...</div>
                        )
                    }
                </div>

                <div className={styles.briefcase}>
                    <button onClick={() => setBriefcaseActive(true)}><img src={briefCaseImg} alt="#" /></button>
                    <span>
                        {checkPrice(String(price))} USD
                        {costDifference < 0 ? '\t' + costDifference.toFixed(2) + '\t' : '\t' + '+' + costDifference.toFixed(2) + '\t' } 
                        ({percentDifference > 0 ? '-' + checkPrice(String(percentDifference)) : '+' + checkPrice(String(Math.abs(percentDifference)))} %)
                    </span>
                </div>
            </header>
            <BriefCase props={{price, setPrice}} active={briefcaseActive} setActive={setBriefcaseActive} />
        </>
    )
}

export default Header;