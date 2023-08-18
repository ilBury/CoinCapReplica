import React, { useEffect, useState } from "react";
import styles from './briefcase.module.scss'
import deleteImg from '../../images/delete.png'
import { CoinInBriefcase } from "../addCoin/addCoin";


const BriefCase = ({props, active, setActive} : any) => {

    const [coinsInBriefcase, setCoinsInBriefcase] = useState<CoinInBriefcase[]>([]); 
    const [changedItem, setChangedItem] = useState<any>(null);
    const [amount, setAmount] = useState<any>(null);
    const { setPrice} = props;

    useEffect(() => {
        if(localStorage.getItem('coin_in_briefcase')) {
            setCoinsInBriefcase(JSON.parse(localStorage.getItem('coin_in_briefcase')!))
        } 
       
        
    }, [active])

    useEffect(() => {
        allCost()
    }, [coinsInBriefcase])

    const amountDigitalAfterPoint = (x: any) => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );

    const calculate = (first: any, second: any) => {
        const firstOperand: number = amountDigitalAfterPoint(first);
      
        const secondOperand: number = amountDigitalAfterPoint(second);
        
        if(firstOperand >= secondOperand) {
            const tempFirst = first * Math.pow(10, firstOperand) - second * Math.pow(10, firstOperand)
           
            return (tempFirst / Math.pow(10, firstOperand));
        } else {
            const tempSecond = first * Math.pow(10, secondOperand) - second * Math.pow(10, secondOperand)
            
            return (tempSecond / Math.pow(10, secondOperand));
        }
       
    }

    const allCost = () => {
        let resultNum: number = 0;
        coinsInBriefcase?.forEach((element) => {
            if(element.amount !== 0) {
                resultNum += element.amount * parseFloat(element.coin.priceUsd)
            }
        })
        setPrice(resultNum); 
    }

    const deleteCoin = (item: any) => {
        setChangedItem(null);
      
       
        const flag = true;
        while(flag) {
            const num = /^[0-9]*[.,]?[0-9]+$/gm;
            const delAmount = prompt('enter the amount you want to delete');
            if(num.test(String(delAmount))) {
                if(parseFloat(delAmount!) > item.amount) {
                    alert("You can't remove more, than you have")
                } else {         
                    
                    item.amount = calculate(item.amount, parseFloat(delAmount!));
                    
                    setCoinsInBriefcase(coinsInBriefcase);
                    setChangedItem(item);
                    setAmount(item.amount);
                    localStorage.setItem('coin_in_briefcase', JSON.stringify(coinsInBriefcase));
                    
                    break;
                }  
            } else if(delAmount === null) {
                break;
            } else {
                alert('Enter number');  
            }
        }
        
       
    }    

    const checkPrice = (val: any) => {
        const reg = /0[.]0+[0-9]+/gm;
        if(reg.test(val)) {
            return val.match(/0[.]0+[0-9]/gm)[0]; 
        } else {
            return parseFloat(val).toFixed(2);
        }  
    }

    return (
        <div className={active ? styles.modal + ' ' + styles.active : styles.modal} onClick={() => setActive(false)}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <h1 className={styles.title}>Coins</h1>
                <div className={styles.coins}>
                    {
                        coinsInBriefcase?.map((item, i) => (
                            item.amount !== 0 ? 
                            <div key={i.toString()} className={styles.coin}>
                                <span>name: {item.coin.name}, 
                                      amount: {(item.coin.name === changedItem?.coin.name && amount) ? changedItem.amount : item.amount},
                                      price: ${(item.amount * checkPrice(item.coin.priceUsd))}</span>
                                <button onClick={() => deleteCoin(item)} className={styles.btn}><img src={deleteImg} alt="#" /></button>
                            </div>
                            : <React.Fragment key={i.toString()}></React.Fragment>
                        ))
                    }
                </div>
            </div>
        </div>
    )

}


export default BriefCase;