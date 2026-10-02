import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Pricing from './pages/Pricing'
import Business from './pages/Business'
import Consumer from './pages/Consumer'
import Security from './pages/Security'
import Faq from './pages/Faq'
import Downloads from './pages/Downloads'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Zum Inhalt springen</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/secureapp" element={<ProductPage id="secureapp" />} />
          <Route path="/messenger" element={<ProductPage id="messenger" />} />
          <Route path="/vpn" element={<ProductPage id="vpn" />} />
          <Route path="/mailguard" element={<ProductPage id="mailguard" />} />
          <Route path="/vault" element={<ProductPage id="vault" />} />
          <Route path="/privatkunden" element={<Consumer />} />
          <Route path="/geschaeftskunden" element={<Business />} />
          <Route path="/preise" element={<Pricing />} />
          <Route path="/sicherheit" element={<Security />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
