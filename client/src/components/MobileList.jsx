import React, { useState, useEffect } from "react";
import { styled, Card, CardContent, Typography, Grid } from "@mui/material";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";
import api from "../services/api";

// Styled components
const MobileCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  '&:hover': {
    transform: "scale(1.05)",
  },
}));

const MobileImage = styled("img")({
  objectFit: "contain",
  height: "200px",
  width: "100%",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
});

const MobileCardContent = styled(CardContent)(({ theme }) => ({
  background: theme.palette.background.default,
  flexGrow: 1,
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
}));

const Title = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: "8px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
});

const Price = styled(Typography)({
  color: "#4CAF50", // Green color for price
});

const MobileList = () => {
  const [mobileData, setMobileData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");

  useEffect(() => {
    // Fetch data from your database using the api instance
    api.get("/")
      .then((response) => {
        setMobileData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching mobile data:", error);
      });
  }, []);

  const handleSearch = ({ term, type }) => {
    setSearchTerm(term);
    setSearchType(type);
  };

  const filteredMobileData = mobileData.filter((mobile) => {
    const searchLower = searchTerm.toLowerCase();

    if (searchType === "price" && !isNaN(searchLower)) {
      // Numeric comparison for the "price" property
      return mobile[searchType] <= parseFloat(searchLower);
    } else {
      // String comparison for other properties
      return mobile[searchType].toLowerCase().includes(searchLower);
    }
  });

  return (
    <div style={{ padding: "20px" }}>
      <ImageSlider onSearch={handleSearch} />

      <Typography variant="h4" gutterBottom style={{ textAlign: "center", color: "#333", marginBottom: "20px", fontWeight: 700 }}>
        Explore Our Mobiles
      </Typography>

      <Grid container spacing={2}>
        {filteredMobileData.map((mobile, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Link to={`/${mobile._id}`} style={{ textDecoration: "none" }}>
              <MobileCard>
                {/* Assuming the image URL is stored in the 'image' field */}
                <MobileImage src={mobile.image} alt={mobile.name} />
                <MobileCardContent>
                  <Title>
                    {mobile.name.length > 25
                      ? `${mobile.name.substring(0, 25)}...`
                      : mobile.name}
                  </Title>
                  <Price>
                    Price: ₹{mobile.price}
                  </Price>
                </MobileCardContent>
              </MobileCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MobileList;
