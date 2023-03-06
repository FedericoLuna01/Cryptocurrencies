export const GetCoinList = async (currency) => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const GetSingleCoin = async (id) => {
  const url = `https://api.coingecko.com/api/v3/coins/${id}`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const GetHistoricalChart = async (id, days = 365, currency) => {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const GetTrendingCoins = async (currency) => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
  const res = await fetch(url)
  const data = await res.json()
  return data
}
