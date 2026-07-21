import type { Weather } from '@/lib/types'
import { createMCPClient } from './client'

const WMO_CODE_MAP: Record<number, string> = {
  0: 'Clear',
  1: 'Partly Cloudy',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Fog',
  51: 'Drizzle',
  53: 'Drizzle',
  55: 'Drizzle',
  56: 'Freezing Drizzle',
  57: 'Freezing Drizzle',
  61: 'Rain',
  63: 'Rain',
  65: 'Heavy Rain',
  66: 'Freezing Rain',
  67: 'Freezing Rain',
  71: 'Snow',
  73: 'Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Rain Showers',
  81: 'Rain Showers',
  82: 'Heavy Rain Showers',
  85: 'Snow Showers',
  86: 'Snow Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with Hail',
  99: 'Thunderstorm with Hail',
}

function getWeatherCondition(code: number): string {
  return WMO_CODE_MAP[code] || `Unknown (${code})`
}

export async function fetchWeather(city: string): Promise<Weather> {
  const mcp = createMCPClient()
  await mcp.connect()

  try {
    const geocodingResult = await mcp.callTool('geocoding', { name: city, count: 1 })
    const geocodingText = (geocodingResult as { content: { type: string; text?: string }[] }).content.find((item) => item.type === 'text')?.text
    if (!geocodingText) {
      throw new Error('City not found')
    }

    const geocodingData = JSON.parse(geocodingText)
    const location = geocodingData.results?.[0]
    if (!location) {
      throw new Error('City not found')
    }

    const { latitude, longitude } = location

    const weatherResult = await mcp.callTool('weather_forecast', {
      latitude,
      longitude,
      current: ['temperature_2m', 'relative_humidity_2m', 'weather_code', 'wind_speed_10m'],
      temperature_unit: 'celsius',
      wind_speed_unit: 'kmh',
    })

    const weatherText = (weatherResult as { content: { type: string; text?: string }[] }).content.find((item) => item.type === 'text')?.text
    if (!weatherText) {
      throw new Error('Weather data not available')
    }

    const weatherData = JSON.parse(weatherText)
    const current = weatherData.current
    if (!current) {
      throw new Error('Current weather data not available')
    }

    return {
      temperature: `${Math.round(current.temperature_2m)}°C`,
      condition: getWeatherCondition(current.weather_code),
      humidity: `${Math.round(current.relative_humidity_2m ?? 0)}%`,
      wind: `${Math.round(current.wind_speed_10m)} km/h`,
    }
  } finally {
    await mcp.disconnect()
  }
}
