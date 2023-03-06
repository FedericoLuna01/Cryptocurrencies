import { LinearProgress, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinInfo } from '../components/CoinInfo'
import { GetSingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'
import ReactHtmlParser from 'react-html-parser'
import { numberWithCommas } from '../components/Carousel'

export const CoinPage = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState()

  const { currency } = CryptoState()

  const fetchCoin = async () => {
    const data = await GetSingleCoin(id)
    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  }, [currency])

  if (!coin) return <LinearProgress style={{ backgroundColor: 'lime', marginTop: 5 }} />

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: { md: 'column', lg: 'row' },
        alignItems: 'center',
        paddingTop: 5
      }}
    >
      <Stack
        sx={{
          width: { md: '100%', lg: '30%' },
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRight: '2px solid grey'
        }}
      >
        <img
          src={coin.image?.large}
          alt={coin?.name}
          height={200}
          style={{
            marginBottom: 5
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            marginBottom: 5
          }}
        >
          {coin.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: '100%',
            padding: 2,
            textAlign: 'justify'
          }}
        >
          {ReactHtmlParser(coin.description?.en.split('. ')[0])}.
        </Typography>
        <Stack
          sx={{
            alignSelf: 'start',
            width: '100%',
            flexDirection: { md: 'column' },
            alignItems: { xs: 'center', sm: 'center', md: 'center', lg: 'start' },
            padding: 2,
            gap: 2
          }}
        >
          <span
            style={{
              display: 'flex'
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold'
              }}
            >
              Rango:&nbsp;
            </Typography>
            <Typography
              variant="h5"
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span
            style={{
              display: 'flex'
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold'
              }}
            >
              Precio Actual:&nbsp;
            </Typography>
            <Typography
              variant="h5"
            >
              $&nbsp;
              {
                numberWithCommas(coin.market_data?.current_price[currency.toLowerCase()])
              }
            </Typography>
          </span>
          <span
            style={{
              display: 'flex'
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold'
              }}
            >
              Market Cap:&nbsp;
            </Typography>
            <Typography
              variant="h5"
            >
              $&nbsp;
              {
                numberWithCommas(coin.market_data?.market_cap[currency.toLowerCase()].toString().slice(0, -6))
              }
              M
            </Typography>
          </span>
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: { xs: '100%', sm: '100%', md: '100%', lg: '70%' },
          padding: 3
        }}
      >
        <CoinInfo coin={coin} />
      </Stack>
    </Stack>
  )
}
