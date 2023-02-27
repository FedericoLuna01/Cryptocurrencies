import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { CoinPage } from './pages/CoinPage'
import { HomePage } from './pages/HomePage'
import './index.css'

export const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
