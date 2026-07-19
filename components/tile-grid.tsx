'use client'

import { CityProfile } from '@/app/page'
import InfoTile from '@/components/info-tile'

export default function TileGrid({ profile }: { profile: CityProfile }) {
  const tiles = [
    {
      title: 'Weather',
      content: `${profile.weather.temperature}, ${profile.weather.condition}. Humidity: ${profile.weather.humidity}. Wind: ${profile.weather.wind}.`,
    },
    {
      title: 'Climate',
      content: `Climate type: ${profile.climate.type}. Average temp: ${profile.climate.averageTemp}. Rainy days: ${profile.climate.rainyDays}. Best time to visit: ${profile.climate.bestTimeToVisit}.`,
    },
    {
      title: 'Tourist Attractions',
      content: profile.attractions
        .map((a) => `${a.name}: ${a.description}`)
        .join(' | '),
    },
    {
      title: 'Gastronomic Highlights',
      content: profile.food
        .map((f) => `${f.name}: ${f.description}`)
        .join(' | '),
    },
    {
      title: 'Historic Insights',
      content: profile.history
        .map((h) => `${h.era}: ${h.summary}`)
        .join(' | '),
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tiles.map((tile) => (
        <InfoTile key={tile.title} title={tile.title}>
          {tile.content}
        </InfoTile>
      ))}
    </div>
  )
}
