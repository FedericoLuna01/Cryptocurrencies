import { Stack } from '@mui/system'

export const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Stack
      onClick={onClick}
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid lime',
        borderRadius: 2,
        padding: { xs: 1, sm: 1, md: 1, lg: 2 },
        paddingLeft: { md: 3, lg: 4 },
        paddingRight: { md: 3, lg: 4 },
        cursor: 'pointer',
        backgroundColor: selected ? 'lime' : '',
        color: selected ? 'black' : '',
        fontWeight: selected ? 700 : 500,
        '&:hover': {
          backgroundColor: !selected ? 'lime' : '',
          color: 'black'
        },
        width: '22%'
      }}
    >
      {children}
    </Stack>
  )
}
