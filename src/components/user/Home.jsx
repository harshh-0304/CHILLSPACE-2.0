// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Grid, Container, Typography, Card, CardMedia, CardContent } from "@mui/material";

// const Home = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("/property/getallproperties") // Fetch all properties
//       .then((res) => {
//         console.log(res.data);
//         setProperties(res.data.data)})

//       .catch((err) => console.error("Error fetching properties:", err))
//       .finally(() => setLoading(false));
//   }, []);
//    console.log("data",properties);
//   return (
//     {
//       properties.map(()=>{

//       })
//     }
//     <Container>
//       <Typography variant="h4" sx={{ my: 3, fontWeight: "bold" }}>
//         Explore ChillSpaces 🌍
//       </Typography>

//       {loading ? (
//         <Typography variant="h6">Loading properties...</Typography>
//       ) : properties.length > 0 ? (
//         <Grid container spacing={3}>
//           {properties.map((property) => (
//             <Grid item xs={12} sm={6} md={4} key={property._id}>
//               <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={property.image || "/default-placeholder.jpg"} // Handle missing images
//                   alt={property.name}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold">
//                     {property.name}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {property.location || "Unknown Location"}
//                   </Typography>
//                   <Typography variant="body1" fontWeight="bold" color="primary">
//                     ₹{property.price}/night
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography variant="h6">No properties available yet.</Typography>
//       )}
//     </Container>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Container, Typography, Card, CardMedia, CardContent } from "@mui/material";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/property/getallproperties")
      .then((res) => {
        console.log("API Response:", res.data);
        setProperties(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => console.error("Error fetching properties:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3, fontWeight: "bold" }}>
        Explore ChillSpaces 🌍
      </Typography>

      {loading ? (
        <Typography variant="h6">Loading properties...</Typography>
      ) : properties.length > 0 ? (
        <Grid container spacing={3}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property._id}>
              <Card
                sx={{ maxWidth: 345, boxShadow: 3, cursor: "pointer" }}
                onClick={() => navigate(`/property/${property._id}`)} // Navigate on click
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={property.propertyURL || "/default-placeholder.jpg"}
                  alt={property.title || "Property Image"}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {property.title || "Unnamed Property"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {property.address || "Unknown Location"}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    ₹{property.price ? property.price.toLocaleString() : "N/A"}/night
                  </Typography>
                  <Typography variant="body2">
                    <strong>Available Rooms:</strong> {property.availableRooms || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No properties available yet.</Typography>
      )}
    </Container>
  );
};

export default Home;
