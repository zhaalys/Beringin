'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { AlertTriangle, Droplets, Calendar, Shield, MapPin } from 'lucide-react';

// Fix for default marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Get icon SVG for custom markers
const getIconSVG = (type, isSelected = false) => {
  const size = isSelected ? 35 : 30;
  const colors = {
    traffic: '#f59e0b',
    flood: '#3b82f6',
    event: '#10b981',
    safety: '#ef4444',
    default: '#6b7280'
  };

  const color = colors[type] || colors.default;
  
  // Create SVG icon based on type
  const iconPaths = {
    traffic: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
    flood: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    event: '<path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>',
    safety: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>',
    default: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>'
  };

  const path = iconPaths[type] || iconPaths.default;

  return `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="${size * 0.6}" height="${size * 0.6}" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        ${path}
      </svg>
    </div>
  `;
};

// Custom marker icons
const createCustomIcon = (type, isSelected = false) => {
  const size = isSelected ? 35 : 30;

  return L.divIcon({
    className: 'custom-marker',
    html: getIconSVG(type, isSelected),
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Component to handle map view updates
function MapViewUpdater({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);

  return null;
}

export default function MapComponent({ alerts = [], selectedAlert, onAlertSelect, mapLayers = {} }) {
  const mapRef = useRef(null);
  const defaultCenter = [-6.2088, 106.8456]; // Jakarta
  const defaultZoom = 11;

  useEffect(() => {
    if (selectedAlert && mapRef.current) {
      const map = mapRef.current;
      map.setView(selectedAlert.location, 15, {
        animate: true,
        duration: 1
      });
    }
  }, [selectedAlert]);

  // Filter alerts based on map layers
  const visibleAlerts = alerts.filter(alert => {
    if (!mapLayers || Object.keys(mapLayers).length === 0) return true;
    return mapLayers[alert.type] !== false;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {visibleAlerts.map((alert) => (
          <Marker
            key={alert.id}
            position={alert.location}
            icon={createCustomIcon(alert.type, selectedAlert?.id === alert.id)}
            eventHandlers={{
              click: () => {
                if (onAlertSelect) {
                  onAlertSelect(alert);
                }
              }
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-gray-800 mb-1">{alert.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{alert.time}</span>
                  <span className={`px-2 py-1 rounded ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
                {alert.area && (
                  <div className="text-xs text-gray-500 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {alert.area}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapViewUpdater center={selectedAlert?.location} zoom={15} />
      </MapContainer>
    </div>
  );
}
