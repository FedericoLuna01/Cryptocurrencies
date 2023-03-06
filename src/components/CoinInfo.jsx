import { CircularProgress, createTheme, ThemeProvider } from '@mui/material'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { GetHistoricalChart } from '../config/api'
import { chartDays } from '../config/data'
import { CryptoState } from '../CryptoContext'
import { SelectButton } from './SelectButton'
import Chart from 'chart.js/auto'

Chart.register()

export const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)

  const { currency } = CryptoState()

  const fetchHistoricalData = async (coin) => {
    if (!coin) return
    const data = await GetHistoricalChart(coin.id, days, currency)
    setHistoricalData(data.prices)
  }

  useEffect(() => {
    fetchHistoricalData(coin)
  }, [days, currency])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      type: 'dark'
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {
          !historicalData
            ? (
          <CircularProgress
            style={{ color: 'lime' }}
            size={250}
            thickness={1}
          />
              )
            : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  const date = new Date(coin[0])
                  const time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`
                  return days === 1 ? time : date.toLocaleDateString()
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: 'lime'
                  }
                ]
              }}
              options={{
                elements: {
                  point: {
                    radius: 1
                  }
                }
              }}
            />
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                justifyContent: 'space-around',
                width: '100%'
              }}
            >
              {
                chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value)
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
                ))
              }
            </div>
          </>
              )}
      </Stack>
    </ThemeProvider>
  )
}
