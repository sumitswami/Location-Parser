import { ClipboardEvent, FormEvent, useMemo, useState } from 'react'
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

const parseCoordinatePair = (value: string): Pick<LocationInput, 'latitude' | 'longitude'> | null => {
  const parts = value.split(',').map((part) => part.trim())
  if (parts.length !== 2) {
    return null
  }

  const latitude = Number(parts[0])
  const longitude = Number(parts[1])
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null
  }

  return {
    latitude: String(latitude),
    longitude: String(longitude),
  }
}

const normalizeLocationInput = (input: LocationInput): LocationInput => {
  const latitudePair = parseCoordinatePair(input.latitude)
  if (latitudePair) {
    return { ...input, ...latitudePair }
  }

  const longitudePair = parseCoordinatePair(input.longitude)
  if (longitudePair) {
    return { ...input, ...longitudePair }
  }

  return input
}

export const LocationForm = ({ onAddLocation }: Props) => {
  const [input, setInput] = useState<LocationInput>(defaultInput)
  const [error, setError] = useState<string | null>(null)

  const normalizedInput = useMemo(() => normalizeLocationInput(input), [input])
  const validationError = useMemo(() => validateLocationInput(normalizedInput), [normalizedInput])

  const handleCoordinatePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const coordinatePair = parseCoordinatePair(event.clipboardData.getData('text'))
    if (!coordinatePair) {
      return
    }

    event.preventDefault()
    setInput((prev) => ({ ...prev, ...coordinatePair }))
    setError(null)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const submitInput = normalizeLocationInput(input)
    const submitError = validateLocationInput(submitInput)

    if (submitInput !== input) {
      setInput(submitInput)
    }

    if (submitError) {
      setError(submitError)
      return
    }

    const parsed = parseLocationInput(submitInput)
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
            onPaste={handleCoordinatePaste}
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
            onPaste={handleCoordinatePaste}
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
