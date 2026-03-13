import Hero from '../components/Hero'
import ServiceCards from '../components/ServiceCards'
import LogoCarousel from '../components/LogoCarousel'
import InteractiveBudgetCalculator from '../components/InteractiveBudgetCalculator'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServiceCards />
      
      {/* Interactive Budget Calculator Section */}
      <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-transparent to-gray-50">
        <div className="max-w-7xl mx-auto">
          <InteractiveBudgetCalculator />
        </div>
      </div>
      
      <LogoCarousel />
      <Footer />
    </>
  )
}
