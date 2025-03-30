import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Card, CardMedia, CardContent, Button, TextField } from "@mui/material";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ checkin: "", checkout: "" });

  useEffect(() => {
    axios
      .get(`/property/${id}`) // Fetch property by ID
      .then((res) => setProperty(res.data))
      .catch((err) => console.error("Error fetching property:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();
    axios
      .post("/booking", { propertyId: id, ...booking })
      .then(() => alert("Booking Confirmed!"))
      .catch((err) => console.error("Booking failed:", err));
  };

  if (loading) return <Typography variant="h6">Loading property details...</Typography>;
  if (!property) return <Typography variant="h6">Property not found.</Typography>;

  return (
    <Container>
      <Card sx={{ maxWidth: "100%", boxShadow: 3, p: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={property.propertyURL || "/default-placeholder.jpg"}
          alt={property.title}
        />
        <CardContent>
          <Typography variant="h4" fontWeight="bold">{property.title}</Typography>
          <Typography variant="h6" color="textSecondary">{property.address}</Typography>
          <Typography variant="h5" fontWeight="bold" color="primary">₹{property.price}/night</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{property.description}</Typography>
          
          {/* Booking Form */}
          <form onSubmit={handleBooking} style={{ marginTop: "20px" }}>
            <TextField
              type="date"
              label="Check-in"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={booking.checkin}
              onChange={(e) => setBooking({ ...booking, checkin: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              type="date"
              label="Check-out"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={booking.checkout}
              onChange={(e) => setBooking({ ...booking, checkout: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Book Now
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PropertyDetail;
