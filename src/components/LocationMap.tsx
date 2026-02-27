import { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { LocationPoint } from '../types/location'
import { createColoredMarkerIcon } from '../lib/markerIcon'

type Props = {
  points: LocationPoint[]
}

const defaultCenter: [number, number] = [20, 0]

export const LocationMap = ({ points }: Props) => {
  const center = useMemo<[number, number]>(() => {
    if (!points.length) {
      return defaultCenter
    }

    const latitudeSum = points.reduce((sum, point) => sum + point.latitude, 0)
    const longitudeSum = points.reduce((sum, point) => sum + point.longitude, 0)
    return [latitudeSum / points.length, longitudeSum / points.length]
  }, [points])

  return (
    <MapContainer center={center} zoom={2} className="location-map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((point) => (
        <Marker
          key={point.id}
          position={[point.latitude, point.longitude]}
          icon={createColoredMarkerIcon(point.color)}
        >
          <Popup>
            Lat: {point.latitude}, Lng: {point.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}