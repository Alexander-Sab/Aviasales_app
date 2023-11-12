import { format, add } from 'date-fns'

import { MINUTES_IN_HOUR, STOPS_TEXT } from '../constants/constants'

export const formatDuration = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_HOUR)
  const minutes = duration % MINUTES_IN_HOUR
  return `${hours}ч ${minutes}м`
}

export const formatTimeRange = (date, duration) => {
  const departureTime = format(new Date(date), 'HH:mm')
  const arrivalTime = format(
    add(new Date(date), { minutes: duration }),
    'HH:mm',
  )
  return `${departureTime} – ${arrivalTime}`
}

export const formatStops = (stops) => {
  const count = stops.length
  return STOPS_TEXT[count] || `${count} пересадки`
}
