import { Box, Container, Typography, CardActions, Card, CardContent, Button} from '@mui/material';

export const Service = () => {
  return (
    <Box position={"relative"}>
        <Container maxWidth={"xl"}>
            <Typography fontSize={58} sx={{textAlign: 'center', marginBottom: 5}}>
                Our Service
            </Typography>

            <Box display={"flex"} sx={{ flexDirection: 'row' }} justifyContent={"center"}>
                <Box display={"flex"} flex={1} justifyContent={"center"}>
                    <Card sx={{ width: 290, minHeight: 400}}>
                        <CardContent sx={{padding: 5}}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                PET GROOMING SERVICE
                            </Typography>
                            <Typography variant="h5" component="div" fontWeight={'bold'} pb={3}>
                                MEMANDIKAN
                            </Typography>
                            <Typography variant="body1">
                                Melayani Jasa Grooming untuk Hewan Peliharaan - Memanjakan & Memandikan Peliharaan Kesayanganmu
                            </Typography>
                            <Typography variant="body1" fontWeight={'bold'}>
                                FREE VITAMIN
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box display={"flex"} flex={1} justifyContent={"center"}>
                    <Card sx={{ width: 290, minHeight: 400}}>
                        <CardContent sx={{padding: 5}}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                PET GROOMING SERVICE
                            </Typography>
                            <Typography variant="h5" component="div" fontWeight={'bold'} pb={3}>
                                POTONG KUKU
                            </Typography>
                            <Typography variant="body1">
                                Melayani Jasa Grooming untuk Hewan Peliharaan - Membersihkan & Mempercantik Kuku Peliharaan Kesayanganmu
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box display={"flex"} flex={1} justifyContent={"center"}>
                    <Card sx={{ width: 290, minHeight: 400}}>
                        <CardContent sx={{padding: 5}}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                PET GROOMING SERVICE
                            </Typography>
                            <Typography variant="h5" component="div" fontWeight={'bold'} pb={3}>
                                PEMBERSIHAN KUTU
                            </Typography>
                            <Typography variant="body1">
                                Melayani Jasa Grooming untuk Hewan Peliharaan - Membersihkan & Merawat Kesehatan Kulit Peliharaan Kesayanganmu
                            </Typography>
                            <Typography variant="body1" fontWeight={'bold'}>
                                KONSULTASI GRATIS
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box display={"flex"} flex={1} justifyContent={"center"}>
                    <Card sx={{ width: 290, minHeight: 400}}>
                        <CardContent sx={{padding: 5}}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                PET GROOMING SERVICE
                            </Typography>
                            <Typography variant="h5" component="div" fontWeight={'bold'} pb={3}>
                                HAIR STYLE
                            </Typography>
                            <Typography variant="body1">
                                Melayani Jasa Grooming untuk Hewan Peliharaan - Memotong & Merawat Bulu Peliharaan Kesayanganmu
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* <Box display={"flex"} flex={1} justifyContent={'center'}>
                    <Box maxWidth={320}>
                    <img width={"100%"} src={petGroom} alt="pet grooming image" />
                    </Box>
                </Box> */}
            </Box>
        </Container>
    </Box>
  )
}