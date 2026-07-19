import type { CityProfile } from './types'

export async function getCityProfile(city: string): Promise<CityProfile> {
  // TODO: Replace with MCP-backed service calls once available.
  return {
    city,
    weather: {
      temperature: '22°C',
      condition: 'Partly Cloudy',
      humidity: '45%',
      wind: '12 km/h',
    },
    climate: {
      type: 'Temperate',
      averageTemp: '18°C',
      rainyDays: '110 days/year',
      bestTimeToVisit: 'May to September',
    },
    attractions: [
      { name: 'Old Town Square', description: 'Historic heart of the city with medieval architecture.' },
      { name: 'Riverside Promenade', description: 'Scenic walking path along the river.' },
      { name: 'Central Park', description: 'Large green space perfect for picnics and relaxation.' },
    ],
    food: [
      { name: 'Local Stew', description: 'Hearty traditional stew served with crusty bread.' },
      { name: 'Street Pastry', description: 'Flaky pastry with regional sweet or savory fillings.' },
    ],
    history: [
      { era: 'Roman Times', summary: 'The area was first settled by Romans as a trading outpost.' },
      { era: 'Medieval Period', summary: 'The city grew around a castle and became a regional hub.' },
      { era: 'Industrial Era', summary: 'Rapid expansion due to manufacturing and trade in the 19th century.' },
    ],
  }
}
