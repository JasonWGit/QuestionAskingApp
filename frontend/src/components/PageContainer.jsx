import Box from '@mui/material/Box';

export default function PageContainer({ children }) {
  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, alignItems: 'center'}}>
        {children}
      </Box>
    </>
  )
}