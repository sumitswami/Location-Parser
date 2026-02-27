import { FormEvent, useMemo, useState } from 'react'
import { parseLocationInput, validateLocationInput } from '../lib/validation'
import type { LocationInput, LocationPoint } from '../types/location'

type Props = {
  onAddLocation: (point: LocationPoint) => void
}

const defaultInput: LocationInput = {
  latitude: '',
  longitude: '',
  color: '#ff3b30',
}

export const LocationForm = ({ onAddLocation }: Props) => {
  const [input, setInput] = useState<LocationInput>(defaultInput)
  const [error, setError] = useState<string | null>(null)

  const validationError = useMemo(() => validateLocationInput(input), [input])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const submitError = validateLocationInput(input)

    if (submitError) {
      setError(submitError)
      return
    }

    const parsed = parseLocationInput(input)
    onAddLocation({
      id: crypto.randomUUID(),
      latitude: parsed.latitude,
      longitude: parsed.longitude,
      color: parsed.color,
    })
    setInput(defaultInput)
    setError(null)
  }

  return (
    <form className="location-form" onSubmit={handleSubmit}>
      <div className="fields-row">
        <label>
          Latitude
          <input
            type="number"
            step="any"
            value={input.latitude}
            onChange={(event) => setInput((prev) => ({ ...prev, latitude: event.target.value }))}
            placeholder="e.g. 12.9716"
            required
          />
        </label>

        <label>
          Longitude
          <input
            type="number"
            step="any"
            value={input.longitude}
            onChange={(event) => setInput((prev) => ({ ...prev, longitude: event.target.value }))}
            placeholder="e.g. 77.5946"
            required
          />
        </label>

        <label>
          Marker Color
          <input
            type="color"
            value={input.color}
            onChange={(event) => setInput((prev) => ({ ...prev, color: event.target.value }))}
            aria-label="Marker color"
          />
        </label>
      </div>

      <button type="submit" disabled={Boolean(validationError)}>
        Add Location
      </button>

      {(error || validationError) && <p className="error-text">{error ?? validationError}</p>}
    </form>
  )
}