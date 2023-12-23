import React, { useState, useEffect } from 'react';

import { Paper, IconButton, Grow,styled } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchForm from './SearchForm';

const images = [
  'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/56904/pexels-photo-56904.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/775091/pexels-photo-775091.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2765873/pexels-photo-2765873.jpeg?auto=compress&cs=tinysrgb&w=600'
  // Add more image URLs as needed
];

const ImageSliderContainer = styled(Paper)`
  position: relative;
  overflow: hidden;
  height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled('img')({
  width: "100%",
  height: "100%",
  filter: "blur(5px)",
  objectFit: "cover",
  borderRadius: "12px",
});

const ImageOverlay = styled('div')({
  position: 'absolute',
  top: '80%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '2',
});

const NavigationButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  color: white;
  font-size: 1.5rem;
`;

const ImageSlider = ({onSearch}) => {
  const [index, setIndex] = useState(0);
  const [inProp, setInProp] = useState(true);

  const handlePrevClick = () => {
    setInProp(false);
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setInProp(false);
    setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    setInProp(true);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Change the interval duration (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [index]);

  return (
    <ImageSliderContainer elevation={5}>
      <Grow in={inProp} style={{ transformOrigin: '0 0 0' }}>
        <Image src={images[index]} alt={`Slide ${index + 1}`} />
      </Grow>
      <ImageOverlay>
        <SearchForm onSearch={onSearch}/>
      </ImageOverlay>
      <NavigationButton style={{ left: '10px' }} onClick={handlePrevClick}>
        <NavigateBeforeIcon />
      </NavigationButton>
      <NavigationButton style={{ right: '10px' }} onClick={handleNextClick}>
        <NavigateNextIcon />
      </NavigationButton>
    </ImageSliderContainer>
  );
};

export default ImageSlider;
