import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerImage from '../../assets/pin.png';

const MapInput = ({ placeholder, inputValue, setInputValue }) => {
    const [selectedPosition, setSelectedPosition] = useState(null);

    const handleClick = (e) => {
        const { lat, lng } = e.latlng;
        setSelectedPosition({ lat, lng });
        setInputValue(`Votre address: Lat: ${lat}\nLng: ${lng}`);
    };

    const MapClick = () => {
        useMapEvent('click', handleClick);
        return null;
    };

    return (
        <div>
            <textarea
                placeholder={placeholder}
                value={inputValue}
                style={{
                    width: '100%',
                    padding: '20px 0px',
                    fontSize: '16px',
                    maxWidth: '500px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    resize: 'none',
                    overflow: 'hidden',
                    height: '40px',
                    lineHeight: '20px',
                }}
                readOnly
            />

            <div style={{ height: '400px', width: '100%' }}>
                <MapContainer center={[47.7388, 7.32964]} zoom={13} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClick />
                    {selectedPosition && (
                        <Marker position={selectedPosition} icon={new L.Icon({
                            iconUrl: markerImage,
                            iconSize: [32, 32],
                            iconAnchor: [16, 32],
                            popupAnchor: [0, -32]
                        })}>
                            <Popup maxWidth={300}>
                                <div style={{ fontSize: '18px'}}>
                                    Latitude: {selectedPosition.lat} <br />
                                    Longitude: {selectedPosition.lng}
                                </div>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapInput;
