import { Box, Container, Typography, Button } from '@mui/material';
import petGroom from '../../assets/pet-groom.png';

export const Banner = () => {
  return (
    <Box position={"relative"}>
      <Container sx={{py: 12}} maxWidth={"md"}>
        <Box display={"flex"} sx={{ flexDirection: 'row' }} alignItems={"center"}>
          <Box flex={1}>
            <Typography as="h1" fontSize={40}>
              Pet Grooming 
            </Typography>
            <Typography as="h2" fontSize={16}>
              Free Gift and Services
            </Typography>
            <Button sx={{mt: 4}} variant='contained' color="primary">
              Booking Now!
            </Button>
          </Box>

          <Box flex={1}>
            <Box maxWidth={320}>
              <img width={"100%"} src={petGroom} alt="pet grooming image" />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}