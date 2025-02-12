import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function serverFetch(endpoint: string, options: RequestInit = {}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw new Error('No session found')
    }

    const baseUrl = process.env.API_BASE_URL
    const headers = {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
    })

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`)
    }

    return response.json()
} 