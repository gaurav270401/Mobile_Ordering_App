// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MobileDetailsPage from './pages/MobileDetailsPage';
import NavBar from './components/Navbar';
import MyOrders from './pages/MyOrders';
import Addtocart from './pages/Addtocart';

const App = () => {
  return (
    <Router>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myorders" element={<MyOrders/>}/>
        <Route path="/:id" element={<MobileDetailsPage/>} />
        <Route path ="/cart" element={<Addtocart/>}/>
      </Routes>
    </Router>
  );
};

export default App;
