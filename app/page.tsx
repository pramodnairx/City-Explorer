'use client'

import { useState, FormEvent } from 'react'
import SearchBar from '@/components/search-bar'
import TileGrid from '@/components/tile-grid'
import LoadingState from '@/components/loading-state'
import ErrorState from '@/components/error-state'

export type CityProfile = {
  city: string
  weather: {
    temperature: string
    condition: string
    humidity: string
    wind: string
  }
  climate: {
    type: string
    averageTemp: string
    rainyDays: string
    bestTimeToVisit: string
  }
  attractions: {
    name: string
    description: string
  }[]
  food: {
    name: string
    description: string
  }[]
  history: {
    era: string
    summary: string
  }[]
}

export default function Home() {
  const [profile, setProfile] = useState<CityProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(city: string) {
    setLoading(true)
    setError(null)
    setProfile(null)

    try {
      const res = await fetch('/api/city', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to fetch city data')
      }

      const data = (await res.json()) as CityProfile
      setProfile(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">City Explorer</h1>
          <p className="mt-2 text-gray-600">
            Discover weather, climate, attractions, food, and history for any city.
          </p>
        </header>

        <section className="mb-10">
          <SearchBar onSearch={handleSearch} />
        </section>

        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {profile && <TileGrid profile={profile} />}
      </div>
    </main>
  )
}
