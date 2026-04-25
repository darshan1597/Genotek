import { Route, Routes } from 'react-router-dom'
import AboutStory from './pages/AboutStory'
import AboutTeam from './pages/AboutTeam'
import Home from './pages/Home'
import InfoPage from './pages/InfoPage'
import watermark from './assets/watermark.png'

function App() {
  return (
    <>
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
            <Route path="/products" element={<InfoPage />} />
            <Route path="/industry" element={<InfoPage />} />
            <Route path="/services" element={<InfoPage />} />
            <Route path="/contact" element={<InfoPage />} />
        </Routes>
    </>
    )
}

export default App
