import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCityProfile } from '@/lib/city-service'

const requestSchema = z.object({
  city: z.string().min(1, 'City is required').max(120, 'City name is too long'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = requestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors.city?.join(', ') || 'Invalid request' },
        { status: 400 }
      )
    }

    const { city } = parsed.data
    const profile = await getCityProfile(city)

    return NextResponse.json(profile, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Something went wrong' },
      { status: 500 }
    )
  }
}
