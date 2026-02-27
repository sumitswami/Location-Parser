import { useState } from 'react'
import { LocationForm } from './components/LocationForm'
import { LocationMap } from './components/LocationMap'
import type { LocationPoint } from './types/location'

export const App = () => {
  const [points, setPoints] = useState<LocationPoint[]>([])

  return (
    <main className="app-shell">
      <section className="panel">
        <h1>Location Parser (V0)</h1>
        <p>Add latitude, longitude, and marker color to plot points on the map.</p>

        <LocationForm onAddLocation={(point) => setPoints((prev) => [...prev, point])} />

        <p className="count-text">Total locations: {points.length}</p>
      </section>

      <section className="map-panel">
        <LocationMap points={points} />
      </section>
    </main>
  )
}