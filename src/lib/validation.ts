import type { LocationInput } from '../types/location'

const hexColorPattern = /^#([0-9a-fA-F]{6})$/

const parseCoordinate = (value: string): number | null => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export const validateLocationInput = (input: LocationInput): string | null => {
  const latitude = parseCoordinate(input.latitude)
  if (latitude === null || latitude < -90 || latitude > 90) {
    return 'Latitude must be a number between -90 and 90.'
  }

  const longitude = parseCoordinate(input.longitude)
  if (longitude === null || longitude < -180 || longitude > 180) {
    return 'Longitude must be a number between -180 and 180.'
  }

  if (!hexColorPattern.test(input.color)) {
    return 'Marker color must be a valid hex color like #ff0000.'
  }

  return null
}

export const parseLocationInput = (input: LocationInput) => ({
  latitude: Number(input.latitude),
  longitude: Number(input.longitude),
  color: input.color,
})