import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import { Search, Filter } from 'lucide-react'

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Sunset Garden Wedding',
    category: 'Wedding',
    date: 'Mar 15, 2026',
    venue: 'Grand Hyatt, Mumbai',
    description: 'A romantic garden wedding with sunset views and premium catering.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
  },
  {
    id: 2,
    title: 'Corporate Annual Gala',
    category: 'Corporate',
    date: 'Mar 20, 2026',
    venue: 'Taj Palace, Delhi',
    description: 'Celebrate your company achievements with style and sophistication.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
  },
  {
    id: 3,
    title: 'Milestone Birthday Bash',
    category: 'Birthday',
    date: 'Mar 25, 2026',
    venue: 'The Oberoi, Bangalore',
    description: 'Make turning 30 memorable with an exclusive rooftop celebration.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600',
  },
  {
    id: 4,
    title: 'Live Jazz Night',
    category: 'Concert',
    date: 'Apr 1, 2026',
    venue: 'JW Marriott, Pune',
    description: 'An evening of soulful jazz under the stars with premium bar.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600',
  },
  {
    id: 5,
    title: 'Traditional Wedding Ceremony',
    category: 'Wedding',
    date: 'Apr 10, 2026',
    venue: 'Leela Palace, Udaipur',
    description: 'A grand traditional wedding with royal treatment and heritage charm.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
  },
  {
    id: 6,
    title: 'Product Launch Party',
    category: 'Corporate',
    date: 'Apr 15, 2026',
    venue: 'Four Seasons, Mumbai',
    description: 'Launch your product with a buzz-worthy event for media and clients.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600',
  },
]

const CATEGORIES = ['All', 'Wedding', 'Corporate', 'Birthday', 'Concert']
export default function EventListingPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const initialCategory = ['Wedding', 'Corporate', 'Birthday', 'Concert'].includes(categoryParam || '') ? categoryParam : 'All'
  const [category, setCategory] = useState(initialCategory)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (categoryParam && ['Wedding', 'Corporate', 'Birthday', 'Concert'].includes(categoryParam)) {
      setCategory(categoryParam)
    }
  }, [categoryParam])

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((event) => {
      const matchCategory = category === 'All' || event.category === category
      const matchSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.venue.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [category, search])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F5F5] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Upcoming <span className="text-rose-500">Events</span>
            </h1>
            <p className="text-gray-600">Discover and book your perfect event experience</p>
          </div>

          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-12 border border-white/50">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                </div>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      category === cat
                        ? 'bg-rose-500 text-white'
                        : 'bg-[#F5F5F5] text-gray-700 hover:bg-rose-100 hover:text-rose-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {filteredEvents.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              No events found. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
