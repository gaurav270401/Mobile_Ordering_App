import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = styled(AppBar)`
  background: #2c3e50;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Tab = styled(NavLink)`
  font-size: 16px;
  margin-right: 20px;
  text-decoration: none;
  color: #ecf0f1;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background 0.3s, color 0.3s;
  font-family: 'Arial', sans-serif;

  &:hover {
    background: #3498db;
    color: #ecf0f1;
  }

  @media (max-width: 768px) {
    margin-right: 10px;
    padding: 10px 15px;
    font-size: 14px;
  }
`;

const CartTab = styled(Tab)`
  margin-left: auto;
`;

const NavBar = () => {
  return (
    <Header position='static'>
      <Toolbar>
        <Tab to="/" exact>
          Home
        </Tab>
        <Tab to="/myorders">My Orders</Tab>
        <CartTab to="/cart">
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </CartTab>
        <Tab >Login</Tab>
      </Toolbar>
    </Header>
  );
};

export default NavBar;
