import React, { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 51.5074, lng: -0.1278 }, 
        zoom: 10, 
      });

      const markers = [
        { lat: 51.509, lng: -0.08, title: 'Marker 1' },
        { lat: 51.497, lng: -0.06, title: 'Marker 2' },
        { lat: 51.52, lng: -0.1, title: 'Marker 3' },
      ];

      markers.forEach(marker => {
        new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: map,
          title: marker.title,
        });
      });
    };

    if (window.google) {
      initMap();
    }
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default Map;
