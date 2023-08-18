import React, {useEffect, useState } from "react";
import styles from './addCoin.module.scss'

export interface CoinInBriefcase {
    coin: any,
    amount: number
}

const AddCoin = ({value, active, setActive}: any) => {  

    const [count, setCount] = useState('');
    const [countDirty, setCountDirty] = useState(false);
    const [countError, setCountError] = useState('Require to enter');
    const [coinsInBriefcase, setCoinsInBriefcase] = useState<CoinInBriefcase[]>([]);
    
    const blurHandler = () => {
        setCountDirty(true);
    }

    

    const countHandler = (e: any) => {
        setCount(e.target.value);
        const num = /^[0-9]*[.,]?[0-9]+$/gm;
        if(!num.test(String(e.target.value))) {
            setCountError('must be number');
        } else {
            setCountError('');
        }
        
    }

    const info = (e: any) => {
        let flag = false;
        if(countError){
            e.preventDefault();
        } else {
            coinsInBriefcase.forEach((item) => {
                if(item.coin.name === value.name) {
                    item.amount += parseFloat(count);
                    flag = true;
                }
            })
            localStorage.setItem('coin_in_briefcase', JSON.stringify(coinsInBriefcase));
            if(!flag) setCoinsInBriefcase([...coinsInBriefcase, {coin: value, amount: parseFloat(count)}]);
            
        }
        
    }

    

    useEffect(() => {
        if(!coinsInBriefcase) return
        if(localStorage.getItem('coin_in_briefcase') && !coinsInBriefcase.length){
            setCoinsInBriefcase(JSON.parse(localStorage.getItem('coin_in_briefcase')!));
        } 

        if(coinsInBriefcase.length) localStorage.setItem('coin_in_briefcase', JSON.stringify(coinsInBriefcase));
        
    }, [coinsInBriefcase])

    return (
        <div className={active ? styles.modal + ' ' + styles.active : styles.modal} onClick={() => setActive(false)}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <h2>{value ? value.name : 'Loading...'}</h2>
                <form className={styles.form} >
                    <input onChange={e => countHandler(e)} value={count} onBlur={() => blurHandler()} className={styles.count} type="text" placeholder="количество" />
                    {(countDirty && countError) && <div style={{color: 'red'}}>{countError}</div>}
                    <button  onClick={(e) => info(e)} className={styles.btn}>Добавить</button>
                </form>
            </div>
        </div>
    )

}


export default AddCoin;