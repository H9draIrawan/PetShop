import { Box , Container, Typography, Card, CardContent, IconButton, CardMedia} from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { blue } from '@mui/material/colors';
import shapeBot from '../../assets/shape.svg';
import cat from '../../assets/cat.png';
import dog from '../../assets/dog.png'
import hamster from '../../assets/hamster.png'
import kelinci from '../../assets/kelinci.png'

export const PetVariant = () => {
  return (
    <Box position={"relative"} minHeight={"80vh"} bgcolor={blue[200]}>
      <Box position={"absolute"} top={-1} left={0} width={"100%"} >
        <img src={shapeBot} alt="shape bottom" />
      </Box>
      <Container sx={{ py: 8, paddingTop: 15, paddingBottom: 15}}>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>
          HEWAN PELIHARAAN
        </Typography>
        <Box sx={{display: 'flex'}}>
          <Card sx={{ display: 'flex', minWidth: 350, marginTop:5, backgroundColor: '#cc9900', color: 'white', borderRadius: 15}}>
            <CardMedia
              component="img"
              sx={{ width: 151, maxHeight: 120 }}
              image={cat}
              alt="cat"
            />
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <CardContent>
                <Typography component="div" variant="h5" fontWeight={'bold'}>
                  Kucing
                </Typography>
              </CardContent>
            </Box>
            <IconButton aria-label="next">
              <ArrowCircleRightIcon/>
            </IconButton>
          </Card>
          <Card sx={{ display: 'flex', minWidth: 350, marginTop:5, backgroundColor: '#3366ff', color: 'white', borderRadius: 15, marginLeft: 5}}>
            <CardMedia
              component="img"
              sx={{ width: 151, maxHeight: 120}}
              image={dog}
              alt="cat"
            />
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <CardContent>
                <Typography component="div" variant="h5" fontWeight={'bold'}>
                  Anjing
                </Typography>
              </CardContent>
            </Box>
            <IconButton aria-label="next">
              <ArrowCircleRightIcon/>
            </IconButton>
          </Card>
          <Card sx={{ display: 'flex', minWidth: 350, marginTop:5, backgroundColor: '#cc3333', color: 'white', borderRadius: 15, marginLeft: 5}}>
            <CardMedia
              component="img"
              sx={{ width: 151, maxHeight: 120}}
              image={hamster}
              alt="cat"
            />
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <CardContent>
                <Typography component="div" variant="h5" fontWeight={'bold'}>
                  Hamster
                </Typography>
              </CardContent>
            </Box>
            <IconButton aria-label="next">
              <ArrowCircleRightIcon/>
            </IconButton>
          </Card>
        </Box>
        <Box sx={{display: 'flex'}} justifyContent={'center'}>
          <Card sx={{ display: 'flex', width: 350, marginTop:5, backgroundColor: '#003300', color: 'white', borderRadius: 15}}>
              <CardMedia
                component="img"
                sx={{ width: 151, maxHeight: 120}}
                image={kelinci}
                alt="cat"
              />
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <CardContent>
                  <Typography component="div" variant="h5" fontWeight={'bold'}>
                    Kelinci
                  </Typography>
                </CardContent>
              </Box>
              <IconButton aria-label="next">
                <ArrowCircleRightIcon/>
              </IconButton>
            </Card>
          </Box>
      </Container>
      <Box position={"absolute"} bottom={-1} left={0} width={"100%"} sx={{transform: 'rotate(180deg)'}} >
        <img src={shapeBot} alt="shape bottom" />
      </Box>
    </Box>
  )
} 