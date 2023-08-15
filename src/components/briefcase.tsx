import React from "react";
import styles from './briefcase.module.scss'
import deleteImg from '../images/delete.png'


const BriefCase = ({active, setActive}) => {



    return (
        <div className={active ? styles.modal + ' ' + styles.active : styles.modal} onClick={() => setActive(false)}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <h1 className={styles.title}>Coins</h1>
                <div className={styles.coins}>
                    <div className={styles.coin}>
                        <span>name: Bitcoin, amount: 1, price: 20$</span>
                        <button className={styles.btn}><img src={deleteImg} alt="#" /></button>
                    </div>
                    <div className={styles.coin}>
                        <span>name: Bitcoin, amount: 1, price: 20$</span>
                        <button className={styles.btn}><img src={deleteImg} alt="#" /></button>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default BriefCase;