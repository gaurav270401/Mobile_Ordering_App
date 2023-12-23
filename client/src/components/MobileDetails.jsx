import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, Paper, Button, styled } from '@mui/material';
import api from '../services/api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  width: '80%',
  marginBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper, // Optional: Add a background color
  borderRadius: theme.shape.borderRadius, // Optional: Add border radius
  boxShadow: theme.shadows[3], // Optional: Add a subtle shadow
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary, // Optional: Adjust text color
}));

const StyledAddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

const MobileDetails = () => {
  const { id } = useParams();
  const [mobile, setMobile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMobileDetails = async () => {
      try {
        const response = await api.get(`/${id}`);
        setMobile(response.data);
      } catch (error) {
        console.error('Error fetching mobile details:', error);
      }
    };

    fetchMobileDetails();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (!mobile) {
        console.error('Mobile details not available');
        return;
      }
      await api.post(`/cart/add/${mobile._id}`);
      console.log(`Added ${mobile.name} to the cart!`);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding mobile to cart:', error);
    }
  };

  if (!mobile) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3}>
          <img
            src={mobile.image}
            alt={mobile.name}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledPaper elevation={3}>
          <StyledHeading variant="h4" gutterBottom>
            {mobile.name}
          </StyledHeading>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Price: ₹{mobile.price}
          </Typography>
          <Typography variant="body1" paragraph>
            Type: {mobile.type}
          </Typography>
          <Typography variant="body1" paragraph>
            Processor: {mobile.processor}
          </Typography>
          <Typography variant="body1" paragraph>
            Memory: {mobile.memory}
          </Typography>
          <Typography variant="body1" paragraph>
            OS: {mobile.os}
          </Typography>
          <StyledAddToCartButton variant="contained" onClick={handleAddToCart}>
            Add to Cart
          </StyledAddToCartButton>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default MobileDetails;
