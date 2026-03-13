import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/booking', label: 'Book Now' },
    ...(user ? [{ to: '/profile', label: 'Profile' }] : []),
    ...(user ? [] : [{ to: '/login', label: 'Login' }]),
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-rose-500/10'
          : 'bg-white/20 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="text-2xl font-bold text-rose-500">
            Eventify
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium transition-colors duration-300 hover:text-rose-500 ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className={`font-medium transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-lg ${
                  scrolled
                    ? 'bg-red-500/20 text-red-600 hover:bg-red-500/30'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>
          <button
            className={`md:hidden p-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block font-medium text-gray-700 hover:text-rose-500 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => {
                  handleLogout()
                  setMobileOpen(false)
                }}
                className="w-full flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-600 font-medium rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>
        </div>
    </nav>
  )
}
