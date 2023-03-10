import './app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTelegram } from '../../hooks/useTelegram';
import ProductList from '../productList/productList';
import CartList from '../cartList/cartList';
import AboutProduct from '../aboutProduct/aboutProduct';
import Delivery from '../delivery/delivery';
import ModalSize from '../modalSize';
import Admin, { AddItem } from '../admin/admin';
import { useEffect } from 'react';

function App() {
  // localStorage.clear();
  
  return (
    <div className='App'>
      <ModalSize/>
      <Router>

        <Routes>
          <Route path='admin' element={<Admin/>}/>
          <Route index element={<ProductList/>}/>
          <Route path='addItem' element={<AddItem/>}/>
          <Route path='delivery' element={<Delivery/>}/>
          <Route path='cart' element={<CartList/>}/>
          <Route path='about' element={<AboutProduct />} />

        </Routes>

      </Router>

    </div>
  )
}

export default App;
