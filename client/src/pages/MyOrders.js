// components/MyOrders.js

import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, styled } from '@mui/material';
import api from '../services/api';

// Styled components
const OrdersContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
});

const HeadingPaper = styled(Paper)({
  width: '100%',
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e0e0e0',
});

const OrdersHeading = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333', // Dark text color
  textAlign: 'center', // Center align text
});

const OrderPaper = styled(Paper)({
  width: '100%',
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s',
  border: '1px solid #e0e0e0',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const OrderHeader = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: '15px',
});

const OrderDetails = styled('div')({
  marginBottom: '10px',
});

const OrderImage = styled('img')({
  maxWidth: '100px',
  maxHeight: '100px',
  objectFit: 'cover',
  marginRight: '10px',
  borderRadius: '4px',
});

const OrderItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  padding: '8px',
  borderRadius: '4px',
  background: '#f5f5f5',
});

const TotalAmount = styled(Typography)({
  fontWeight: 'bold',
  marginTop: '10px',
  textAlign: 'right', // Align text to the right
});

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <OrdersContainer container spacing={3}>
      <HeadingPaper elevation={3}>
        <OrdersHeading variant="h4">My Orders</OrdersHeading>
      </HeadingPaper>
      {orders.map((order) => (
        <Grid item xs={12} key={order.id}>
          <OrderPaper elevation={3}>
            <OrderHeader>
              <Typography variant="subtitle1" style={{ marginBottom: '5px', color: '#555' }}>
                Order #{order.orderNumber}
              </Typography>
              <Typography variant="subtitle2" style={{ marginBottom: '10px', color: '#777' }}>
                {order.orderDate}
              </Typography>
            </OrderHeader>
            <OrderDetails>
              {order.items.map((item) => (
                <OrderItem key={item.id}>
                  <OrderImage src={item.image} alt={item.name} />
                  <div>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body2">
                      {item.quantity} x ₹{item.price}
                    </Typography>
                  </div>
                </OrderItem>
              ))}
            </OrderDetails>
            <TotalAmount variant="h6" style={{ color: '#333' }}>
              Total: ₹{order.totalAmount}
            </TotalAmount>
          </OrderPaper>
        </Grid>
      ))}
    </OrdersContainer>
  );
};

export default MyOrders;
