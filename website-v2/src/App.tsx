import { Route, Routes } from 'react-router-dom'
import BHeader from './b/BHeader'
import BFooter from './b/BFooter'
import BHome from './b/BHome'
import ProductPage from './pages/ProductPage'
import PricingPage from './b/pages/PricingPage'
import BusinessPage from './b/pages/BusinessPage'
import PrivatePage from './b/pages/PrivatePage'
import Security from './pages/Security'
import Faq from './pages/Faq'
import Downloads from './pages/Downloads'
import Login from './pages/Login'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Zum Inhalt springen</a>
      <BHeader />
      <main id="main">
        <Routes>
          <Route path="/" element={<BHome />} />
          <Route path="/secureapp" element={<ProductPage id="secureapp" />} />
          <Route path="/messenger" element={<ProductPage id="messenger" />} />
          <Route path="/vpn" element={<ProductPage id="vpn" />} />
          <Route path="/mailguard" element={<ProductPage id="mailguard" />} />
          <Route path="/vault" element={<ProductPage id="vault" />} />
          <Route path="/privatkunden" element={<PrivatePage />} />
          <Route path="/geschaeftskunden" element={<BusinessPage />} />
          <Route path="/preise" element={<PricingPage />} />
          <Route path="/sicherheit" element={<Security />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/legal/:slug" element={<Legal />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BFooter />
    </>
  )
}
