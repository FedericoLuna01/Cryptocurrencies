import { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import { GetCoinList } from '../config/api'
import { Container } from '@mui/system'
import { createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { numberWithCommas } from './Carousel'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#19857b'
    }
  }
})

export const CoinsTable = () => {
  const [coins, setCoins] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const { currency } = CryptoState()

  const fetchCoins = async () => {
    setLoading(true)
    const data = await GetCoinList(currency)
    setCoins(data)
    setLoading(false)
  }

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(inputValue) ||
        coin.symbol.toLowerCase().includes(inputValue)
    )
  }

  useEffect(() => {
    fetchCoins()
    console.log(coins)
  }, [currency])

  return (
    <ThemeProvider
      theme={theme}
    >
      <Container
        sx={{
          textAlign: 'center'
        }}
      >
        <Typography
          variant='h4'
          sx={{
            color: 'white',
            fontSize: 25,
            margin: 5
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          label='Busca una criptomoneda'
          variant='outlined'
          sx={{
            width: '100%',
            marginBottom: 5
          }}
        />
        <TableContainer>
          {
            loading
              ? (
              <LinearProgress
                sx={{
                  width: '100%',
                  backgroundColor: 'lime'
                }}
              />
                )
              : (
                <Table>
                  <TableHead
                    sx={{
                      backgroundColor: 'lime',
                      width: '100%'
                    }}
                  >
                    {
                      ['Coin', 'Precio', 'Cambio 24', 'Market Cap'].map(item => (
                        <TableCell
                          key={item}
                          align={item === 'Coin' ? '' : 'right'}
                          sx={{
                            color: 'black',
                            fontWeight: 'bold'
                          }}
                        >
                          {item}
                        </TableCell>
                      ))
                    }
                  </TableHead>
                  <TableBody>
                    {
                      handleSearch()
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                        .map(row => {
                          const profit = row.price_change_percentage_24h > 0
                          return (
                          <TableRow
                            key={row.id}
                            component={Link}
                            to={`/coins/${row.id}`}
                            sx={{
                              backgroundColor: '#16171a',
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: '#131111'
                              }
                            }}
                          >
                            <TableCell
                              component='th'
                              scope='row'
                              sx={{
                                display: 'flex',
                                gap: 2
                              }}
                            >
                              <img
                                src={row?.image}
                                alt={row?.name}
                                height='50px'
                                style={{ marginBottom: 10 }}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: 'uppercase',
                                    fontSize: 20
                                  }}
                                >
                                  {row?.symbol}
                                </span>
                                <span
                                  style={{
                                    color: 'gray'
                                  }}
                                >
                                  {row?.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell
                              align='right'
                            >
                              $ {numberWithCommas(row.current_price.toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                                fontWeight: 500
                              }}
                            >
                              {profit && '+'}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>
                            <TableCell align="right">
                              $ {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )} M
                            </TableCell>
                          </TableRow>
                          )
                        })
                    }
                  </TableBody>
                </Table>
                )
          }
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(e, value) => {
            setPage(value)
            window.scroll(0, 450)
          }}
          sx={{
            padding: 5,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        />
      </Container>
    </ThemeProvider>
  )
}
