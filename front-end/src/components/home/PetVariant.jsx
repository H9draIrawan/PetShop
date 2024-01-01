import { Box , Container} from '@mui/material';
import { blue } from '@mui/material/colors';
import shapeBot from '../../assets/shape.svg';

export const PetVariant = () => {
  return (
    <Box position={"relative"} minHeight={"80vh"} bgcolor={blue[200]}>
      <Box position={"absolute"} top={-1} left={0} width={"100%"} >
        <img src={shapeBot} alt="shape bottom" />
      </Box>
      <Container sx={{ py: 8 }}>
        Pet Hello
      </Container>
    </Box>
  )
} 