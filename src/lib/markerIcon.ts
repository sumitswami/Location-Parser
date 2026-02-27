import L from 'leaflet'

export const createColoredMarkerIcon = (color: string) =>
  L.divIcon({
    className: 'custom-div-marker',
    html: `<span class="marker-pin" style="background:${color}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })