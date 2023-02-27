import { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { GetCoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'

const responsive = {
  0: {
    items: 2
  },
  512: {
    items: 4
  }
}

export function numberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const Carousel = () => {
  const [trendCrypto, setTrendCrypto] = useState([])
  const { currency } = CryptoState()
  const fetchTrendingCoins = async () => {
    const data = await GetCoinList(currency)
    setTrendCrypto(data)
  }

  useEffect(() => {
    fetchTrendingCoins()
    console.log(trendCrypto)
  }, [currency])

  const items = trendCrypto.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0
    return (
      <Link
        key={coin.id}
        to={`/coins/${coin.id}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          textTransform: 'uppercase',
          textDecoration: 'none',
          margin: '0 20',
          color: 'white'
        }}
      >
        <img
          src={coin?.image}
          alt={coin?.name}
          height='80px'
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
              fontWeight: 500
            }}
          >
            {profit && '+'}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          $ {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
        width: '100%'
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={2000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  )
}
