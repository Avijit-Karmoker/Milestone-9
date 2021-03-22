import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import  API_KEY  from '../config';

const containerStyle = {
  width: '100%',
  height: '800px',
  margin: 'auto'
};

const location = {
  lat: 22.483137,
  lng: 90.059248
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey= {API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={18}
      >
         <Marker
      position={location}
    />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)