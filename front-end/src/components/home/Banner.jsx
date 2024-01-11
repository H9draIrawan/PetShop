import { Box, Container, Typography, Button } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import petGroom from '../../assets/pet-groom.png';

export const Banner = () => {
  const navigate = useNavigate()
  return (
    <Box position={"relative"}>
      <Container sx={{py: 8}} maxWidth={"lg"}>
      
        <Box display={"flex"} sx={{ flexDirection: 'row' }} alignItems={"center"}>
          <Box flex={1}>
            <Typography fontSize={58}>
              Professional and Affordable Pet Grooming
            </Typography>
            <Typography as="h2" fontSize={30}>
              Premium grooming and styling
            </Typography>
            <Button sx={{mt: 4}} variant='contained' color="primary" onClick={() => {
									navigate("/home/order");
								}}>
              Booking Now!
            </Button>
          </Box>

          <Box display={"flex"} flex={1} justifyContent={'center'}>
            <Box maxWidth={320}>
              <img width={"100%"} src={petGroom} alt="pet grooming image" />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}