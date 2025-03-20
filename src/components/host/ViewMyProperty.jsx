import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./property.css";

export const ViewMyProperty = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAllMyProperties = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("property/getpropertiesbyuserid/" + localStorage.getItem("id"));
            console.log(res.data); // API response...
            setProperties(res.data.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getAllMyProperties();
    }, []);

    return (
        <div>
            <h1 className="page-title">My Properties</h1>
            {isLoading ? (
                <p className="loading">Loading properties...</p>
            ) : (
                <div className="grid-container">
                    {properties.length > 0 ? (
                        properties.map((property) => (
                            <div key={property._id} className="property-card">
                                <img src={property.propertyURL} alt={property.title} className="property-image" />
                                <h2>{property.title}</h2>
                                <p>{property.address}</p>
                        
                                <p><strong>Price:</strong> ₹{property.price ? property.price.toLocaleString() : "N/A"}</p>
                                <p><strong>Available Rooms:</strong> {property.availableRooms || "N/A"}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-properties">No properties found.</p>
                    )}
                </div>
            )}
        </div>
    );
};
