
import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header.tsx';
import Coin from './pages/coin.tsx';
import Main from './pages/main.tsx';
import {Route, Routes} from 'react-router-dom';


export const CoinContext = createContext(null);

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
