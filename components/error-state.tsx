'use client'

export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
      <p className="font-medium">Something went wrong</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  )
}
