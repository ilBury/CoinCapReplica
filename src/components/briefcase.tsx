import React, { useEffect, useState } from "react";
import styles from './briefcase.module.scss'
import deleteImg from '../images/delete.png'
import { CoinInBriefcase } from "./addCoin";


const BriefCase = ({active, setActive}) => {

    const [coinsInBriefcase, setCoinsInBriefcase] = useState<CoinInBriefcase[]>([]); 

    useEffect(() => {
        if(localStorage.getItem('coin_in_briefcase')) {
            setCoinsInBriefcase(JSON.parse(localStorage.getItem('coin_in_briefcase')!))
        } 
        console.log(coinsInBriefcase)
    }, [active])

    return (
        <div className={active ? styles.modal + ' ' + styles.active : styles.modal} onClick={() => setActive(false)}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <h1 className={styles.title}>Coins</h1>
                <div className={styles.coins}>
                    {
                        coinsInBriefcase.map((item, i) => (
                            <div key={i.toString()} className={styles.coin}>
                                <span>name: {item.coin.name}, amount: {item.amount}, price: 20$</span>
                                <button className={styles.btn}><img src={deleteImg} alt="#" /></button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )

}


export default BriefCase;