import { createContext, useContext, useState } from 'react'

const Crypto = createContext()

export const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('USD')

  return (
    <Crypto.Provider value={{ currency, setCurrency }}>
      {children}
    </Crypto.Provider>
  )
}

export const CryptoState = () => {
  return useContext(Crypto)
}
