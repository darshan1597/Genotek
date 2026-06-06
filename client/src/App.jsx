import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AboutStory from './pages/AboutStory'
import AboutTeam from './pages/AboutTeam'
import WhyGenotek from './pages/WhyGenotek'
import GenotekInfra from './pages/GenotekInfra'
import Footer from './pages/components/Footer'
import Home from './pages/Home'
import InfoPage from './pages/InfoPage'
import watermark from './assets/watermark.png'
import GetInTouch from './pages/GetInTouch'
import Services from './pages/Services'
import Industry from './pages/Industry'
import Chemical from './pages/Chemical'
import Product from './pages/Product'

function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      {/* <img
        src={watermark}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 h-screen w-screen object-cover opacity-[0.2] mix-blend-multiply"
      /> */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/story" element={<AboutStory />} />
            <Route path="/about/team" element={<AboutTeam />} />
            <Route path="/about/why-genotek" element={<WhyGenotek />} />
            <Route path="/about/infra" element={<GenotekInfra />} />
            <Route path="/products/chemical" element={<Chemical />} />
            <Route path="/products/chemical/:categoryName" element={<Product />} />
            {/* <Route path="/product/:categoryName" element={<Product />} /> */}
            <Route path="/industry" element={<Industry />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<GetInTouch />} />
        </Routes>
    </>
    )
}

export default App
