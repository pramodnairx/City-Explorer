export interface Weather {
  temperature: string
  condition: string
  humidity: string
  wind: string
}

export interface Climate {
  type: string
  averageTemp: string
  rainyDays: string
  bestTimeToVisit: string
}

export interface Attraction {
  name: string
  description: string
}

export interface Food {
  name: string
  description: string
}

export interface History {
  era: string
  summary: string
}

export interface CityProfile {
  city: string
  weather: Weather
  climate: Climate
  attractions: Attraction[]
  food: Food[]
  history: History[]
}
