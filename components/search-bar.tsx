'use client'

import { useState, FormEvent } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value.trim()) {
      onSearch(value.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl mx-auto gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a city name..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  )
}
