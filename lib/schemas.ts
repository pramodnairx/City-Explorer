import { z } from 'zod'
import type { CityProfile } from './types'

export const cityRequestSchema = z.object({
  city: z.string().min(1, 'City is required').max(120, 'City name is too long'),
})

export const weatherSchema = z.object({
  temperature: z.string(),
  condition: z.string(),
  humidity: z.string(),
  wind: z.string(),
})

export const climateSchema = z.object({
  type: z.string(),
  averageTemp: z.string(),
  rainyDays: z.string(),
  bestTimeToVisit: z.string(),
})

export const attractionSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const foodSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const historySchema = z.object({
  era: z.string(),
  summary: z.string(),
})

export const cityProfileSchema: z.ZodType<CityProfile> = z.object({
  city: z.string(),
  weather: weatherSchema,
  climate: climateSchema,
  attractions: z.array(attractionSchema),
  food: z.array(foodSchema),
  history: z.array(historySchema),
})
