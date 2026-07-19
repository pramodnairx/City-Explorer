'use client'

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-gray-600">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      <p>Looking up city data...</p>
    </div>
  )
}
