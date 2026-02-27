# Location Parser

V0 web app to add latitude/longitude points and plot them on a map.

## Features (V0)

- Add a location via latitude and longitude from the UI.
- Add multiple locations from the UI and see all points plotted.
- Customize each marker color per point.

## Tech

- React + Vite + TypeScript
- Leaflet + React Leaflet
- OpenStreetMap tile layer

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL (usually `http://localhost:5173`).

## Input rules

- Latitude must be between `-90` and `90`.
- Longitude must be between `-180` and `180`.
- Color must be a valid hex value from the color picker.# Location-Parser