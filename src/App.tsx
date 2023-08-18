import * as React from "react";
import { createContext, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Coin from './components/coin/coin';
import Main from './components/main/main';
import {Route, Routes} from 'react-router-dom';




export const CoinContext = createContext<any>(null);

function App() {

  const [coin, setCoin] = useState(null);
  


  return (

    
    <CoinContext.Provider value={{coin, setCoin}}>
      
      <Header />
      <Routes>
        <Route path='/CoinCapReplica'  element={<Main/>} />
        <Route path='/coin/:id' element={<Coin/>} />
      </Routes>
    
    </CoinContext.Provider>
    
    
  );
}

export default App;
