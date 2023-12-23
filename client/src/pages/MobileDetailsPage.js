import React from 'react';
import { useParams } from 'react-router-dom';
import MobileDetails from '../components/MobileDetails';
import { styled, Container, Typography, Paper } from '@mui/material';

const StyledDetailsContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.background.default, // Match background color with NavBar
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main, // Match heading color with NavBar
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper, // Match background color with NavBar
}));

const MobileDetailsPage = () => {
  const { id } = useParams();

  return (
    <StyledDetailsContainer>
      <StyledHeading variant="h2" gutterBottom>
        Mobile Details
      </StyledHeading>
      <StyledPaper elevation={3}>
        <MobileDetails id={id} />
      </StyledPaper>
    </StyledDetailsContainer>
  );
};

export default MobileDetailsPage;
