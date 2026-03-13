import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BookingForm from '../components/BookingForm'
import { API_BASE, fetchJSON } from '../utils/api'

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const eventId = searchParams.get('event')
  const [initialEvent, setInitialEvent] = useState(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      if (!eventId) return
      try {
        const ev = await fetchJSON(`${API_BASE}/api/events/${eventId}`)
        if (!cancelled) setInitialEvent(ev)
      } catch (err) {
        // ignore, keep initialEvent null
      }
    }
    load()
    return () => { cancelled = true }
  }, [eventId])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F5F5] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Book Your <span className="text-rose-500">Dream Event</span>
            </h1>
            <p className="text-gray-600">Simple steps to bring your vision to life</p>
          </div>
          <BookingForm initialEvent={initialEvent} />
        </div>
      </div>
    </>
  )
}
