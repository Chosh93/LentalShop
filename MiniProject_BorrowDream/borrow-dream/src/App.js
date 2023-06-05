import './App.css';
import Basket from './pages/basket/basket';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false); // 전체 선택 체크박스 상태
  const [checkedItems, setCheckedItems] = useState([]); // 개별 선택 체크박스 상태
  const convertPrice = (price) => {
    if (price === undefined || isNaN(price)) return '';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
      <Router>
        <Routes>
          <Route path='/' element= {<Basket cart={cart} setCart={setCart} checkedAll={checkedAll} setCheckedAll={setCheckedAll} checkedItems={checkedItems} setCheckedItems={setCheckedItems} convertPrice={convertPrice}/>} />
        </Routes>
      </Router>
  );
}

export default App;
