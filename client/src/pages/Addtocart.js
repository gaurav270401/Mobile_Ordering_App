import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Paper, styled, useTheme } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// Styled components
const CartContainer = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',

});

const ProductPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px',
  [theme.breakpoints.down('sm')]: {
    width: '100%', // Adjust width for smaller screens
  },
}));

const ProductImage = styled('img')({
  width: '120px',
  height: '120px',
  objectFit: 'contain',
  marginRight: '20px',
  borderRadius: '8px',
});

const ProductDetails = styled('div')({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
});

const ProductInfo = styled('div')({
  marginBottom: '10px',
});

const QuantityContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
});

const QuantityTag = styled(Typography)({
  marginRight: '10px',
  fontSize: '1rem',
});

const QuantityButton = styled(Button)({
  minWidth: '30px',
  padding: '0',
  marginRight: '5px',
  backgroundColor: '#f0f0f0',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  borderRadius: '4px',
  fontSize: '0.9rem',
});

const RemoveButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#e04343',
  '&:hover': {
    backgroundColor: '#c0392b',
  },
  marginTop: '15px',
  borderRadius: '4px',
  fontSize: '0.9rem',
});

const ProductPrice = styled('div')({
  textAlign: 'right',
  marginLeft: '20px',
});

const CheckoutPaper = styled(Paper)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const ProceedToCheckoutButton = styled(Button)({
  backgroundColor: '#4caf50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#45a049',
  },
  fontSize: '1rem',
});

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    console.log('Fetching cart items...');
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/cartitems');
        console.log(response);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (name, action) => {
    try {
      const response = await api.post(`/cart/change-quantity/${name}`, { action });
      const updatedCart = response.data;
      setCart(updatedCart);
    } catch (error) {
      console.error('Error changing quantity:', error);
    }
  };

  const handleRemoveItem = async (name) => {
    try {
      await api.delete(`/cart/remove-item/${name}`);
      const response = await api.get('/cartitems');
      const updatedCart = response.data;
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const generateOrderNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const timestamp = new Date().getTime();
    return `ORDER-${randomNumber}-${timestamp}`;
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleProceedToCheckout = async () => {
    try {
      const orderNumber = generateOrderNumber();
      const totalAmount = calculateTotalAmount();

      const orderItems = cart.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        image: product.image,
      }));

      const response = await api.post('/orders', {
        orderNumber,
        items: orderItems,
        totalAmount,
      });

      console.log('Order created successfully:', response.data);

      setCart([]);
    } catch (error) {
      console.error('Error creating order:', error);
    }
    navigate('/myorders');
  };

  return (
    <CartContainer container spacing={3}>
      <Grid item xs={12}>
      <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        <Grid container spacing={3}>
          {cart.map((product) => (
            <Grid item xs={12} key={product.id}>
              <ProductPaper elevation={3}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductDetails>
                  <ProductInfo>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="subtitle1">
                      {product.type} | {product.processor} | {product.memory} | {product.os}
                    </Typography>
                  </ProductInfo>
                  <QuantityContainer>
                    <QuantityTag variant="body2">Qty:</QuantityTag>
                    <QuantityButton
                      variant="outlined"
                      size="small"
                      onClick={() => handleQuantityChange(product.name, 'decrement')}
                    >
                      -
                    </QuantityButton>
                    <Typography variant="body1">{product.quantity}</Typography>
                    <QuantityButton
                      variant="outlined"
                      size="small"
                      onClick={() => handleQuantityChange(product.name, 'increment')}
                    >
                      +
                    </QuantityButton>
                  </QuantityContainer>
                  <RemoveButton variant="contained" onClick={() => handleRemoveItem(product.name)}>
                    Remove
                  </RemoveButton>
                </ProductDetails>
                <ProductPrice>
                  <Typography variant="h6">₹{product.price * product.quantity}</Typography>
                </ProductPrice>
              </ProductPaper>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CheckoutPaper elevation={3}>
              <Typography variant="h6" style={{ marginBottom: '15px' }}>
                Total: ₹{calculateTotalAmount()}
              </Typography>
              <ProceedToCheckoutButton variant="contained" onClick={() => handleProceedToCheckout()}>
                Proceed to Checkout
              </ProceedToCheckoutButton>
            </CheckoutPaper>
          </Grid>
        </Grid>
      </Grid>
    </CartContainer>
  );
};

export default CartPage;
