import React, { useEffect, useState } from "react";

import styles from './Header.module.scss'
import briefCaseImg from '../images/briefcase.png'
//@ts-ignore
import { getData } from "../utils/getData.ts";
import { Coin } from "../utils/type";



const Header = () => {

    const [coins, setCoins] = useState<Coin[]>(null!)
    

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(3);
            setCoins(data.data);       
        }
        if(!coins) {
            fetchData();
        }   
    }, [coins])
   
   
    return (
        <header className={styles.header} >
            <div className={styles.coins}>
                {coins ? 
                    coins.map((item, i) => (
                        <div key={i.toString()}>{item.name}: ${parseFloat(item.priceUsd).toFixed(2)}</div>
                    )) : (
                        <div>Loading...</div>
                    )
                }
            </div>

            <div className={styles.briefcase}>
                <button><img src={briefCaseImg} alt="#" /></button>
                <span>138 USD + 2,38 (1,8%)</span>
            </div>
        </header>
    )
}

export default Header;