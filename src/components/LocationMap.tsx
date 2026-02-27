import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import type { LocationPoint } from '../types/location'
import { createColoredMarkerIcon } from '../lib/markerIcon'

type Props = {
  points: LocationPoint[]
}

const defaultCenter: [number, number] = [20, 0]
const focusedZoom = 13

const FocusOnLatestPoint = ({ latestPoint }: { latestPoint?: LocationPoint }) => {
  const map = useMap()

  useEffect(() => {
    if (!latestPoint) {
      return
    }

    map.flyTo([latestPoint.latitude, latestPoint.longitude], focusedZoom, {
      animate: true,
      duration: 0.8,
    })
  }, [latestPoint, map])

  return null
}

export const LocationMap = ({ points }: Props) => {
  const latestPoint = points.length ? points[points.length - 1] : undefined

  return (
    <MapContainer center={defaultCenter} zoom={2} className="location-map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FocusOnLatestPoint latestPoint={latestPoint} />

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
