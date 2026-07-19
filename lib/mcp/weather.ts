import type { Weather } from '@/lib/types'

export async function fetchWeather(city: string): Promise<Weather> {
  // TODO: Replace with actual MCP weather service call.
  // Example shape:
  // const client = createMCPClient()
  // return client.callTool('weather', { city })
  throw new Error('Weather MCP service not implemented yet')
}
