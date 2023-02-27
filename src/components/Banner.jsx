import { Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import { Carousel } from './Carousel'

export const Banner = () => {
  return (
    <Stack
      sx={{
        backgroundImage: 'url(/heroBg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Container
        sx={{
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around'
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography
            variant='h2'
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              marginBottom: 2
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant='p'
            sx={{
              color: '#bbb',
              fontSize: 20,
              marginBottom: 5
            }}
          >
            El mejor lugar para ver tus criptomonedas.
          </Typography>
          <Carousel />
        </Stack>
      </Container>
    </Stack>
  )
}
