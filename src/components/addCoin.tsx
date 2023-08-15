import React from "react";
import styles from './addCoin.module.scss'


const AddCoin = ({active, setActive}) => {



    return (
        <div className={active ? styles.modal + ' ' + styles.active : styles.modal} onClick={() => setActive(false)}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <h2>Bitcoin</h2>
                <form className={styles.form} >
                    <input type="text" placeholder="количество" />
                    <button className={styles.btn}>Добавить</button>
                </form>
            </div>
        </div>
    )

}


export default AddCoin;