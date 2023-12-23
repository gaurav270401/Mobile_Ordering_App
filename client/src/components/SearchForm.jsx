import React, { useState } from 'react';
import { InputAdornment, Input, Paper, styled, MenuItem, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const StyledSearchForm = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  margin: '0 auto',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: 'box-shadow 0.3s ease-in-out',

  '&:hover': {
    boxShadow: theme.shadows[4],
  },

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const StyledInput = styled(Input)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  '& input': {
    fontSize: '1rem',
    padding: theme.spacing(1),
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    marginRight: 0,
    marginBottom: 0,
  },
}));

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch({ term: searchTerm, type: searchType });
  };

  return (
    <StyledSearchForm elevation={3}>
      <StyledSelect value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="type">Type</MenuItem>
        <MenuItem value="processor">Processor</MenuItem>
        <MenuItem value="memory">Memory</MenuItem>
        <MenuItem value="os">OS</MenuItem>
      </StyledSelect>
      <StyledInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search mobiles"
        endAdornment={
          <InputAdornment position="end">
            <IconButton color="primary" onClick={handleSearch}>
              <SearchIcon fontSize="large" />
            </IconButton>
          </InputAdornment>
        }
      />
    </StyledSearchForm>
  );
};

export default SearchForm;
