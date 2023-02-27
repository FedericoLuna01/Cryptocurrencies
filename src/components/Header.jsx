import { AppBar, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

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
export const Header = () => {
  const { currency, setCurrency } = CryptoState()

  return (
    <ThemeProvider theme={theme} >
      <AppBar
        color='transparent'
        position='static'
      >
        <Container>
          <Toolbar>
            <Typography
              component={Link}
              to='/'
              sx={{
                fontSize: 20,
                fontWeight: 600,
                color: 'lime',
                textDecoration: 'none'
              }}
            >
              Crypto Tracker
            </Typography>
            <Select
              variant='outlined'
              sx={{
                width: 100,
                height: 40,
                marginLeft: 15,
                color: 'primary.main'
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value='USD'>USD</MenuItem>
              <MenuItem value='ARS'>ARS</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
