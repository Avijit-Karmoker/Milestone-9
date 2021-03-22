import React, { useState } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import API_KEY from "../config";

const containerStyle = {
  width: "100%",
  height: "800px",
  margin: "auto",
};

const location = {
  lat: 22.483137,
  lng: 90.059248,
};

function Direction({ origin, destination }) {
  const [directionResponse, setDirectionResponse] = useState(null);
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={18}>
        {origin !== "" && destination !== "" && (
          <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: "DRIVING",
            }}
            callback={(res) => {
              if (res != null) {
                setDirectionResponse(res);
              }
            }}
          />
        )}
        {directionResponse && (
          <DirectionsRenderer
            // required
            options={{
              directions: directionResponse,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Direction);
