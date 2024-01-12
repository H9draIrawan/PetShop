import * as React from 'react';
import {Box, Grid, List, ListItem, ListItemText, Typography, Container} from '@mui/material';
import { styled} from "@mui/material/styles";
import logo from '../assets/logo.png'

// const Item = styled(Paper)(({ theme }) => ({
//     // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     // ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     evalution: 0
//     // color: theme.palette.text.secondary,
//   }));

export default function Footer() {

  return (
        <Box sx={{ flexGrow: 1, height: 500, padding: 10}}>
            <Grid container spacing={2} pt={8} sx={{borderTop: "1px dashed #a0a0a0"}}>
                <Grid item xs={4}>
                    <img src={logo} alt="" style={{maxWidth: 200, paddingBottom: 10}}/>
                    <Typography fontSize={30}>
                        PET SHOP SURABAYA
                    </Typography>
                    <Typography>
                        Jl. Ngagel Jaya Tengah 73-77, Baratajaya, Kecamatan Gubeng, Kota Surabaya, Jawa Timur
                    </Typography>
                </Grid>
                <Grid item  xs={8} >
                    <Grid container spacing={3} sx={{paddingLeft: 5, justifyContent: 'end'}}>
                        <Grid item xs={3}>
                            <Typography style={{fontWeight: 'bold'}}>
                                TOKO ONLINE
                            </Typography>
                            <List >
                                <ListItem sx={{padding: 0}}>
                                    <ListItemText
                                        primary="Tokopedia"
                                    />
                                </ListItem>
                                <ListItem sx={{padding: 0}}>
                                    <ListItemText
                                        primary="Shopee"
                                    />
                                </ListItem>
                                <ListItem sx={{padding: 0}}>
                                    <ListItemText
                                        primary="Bukalapak"
                                    />
                                </ListItem>
                                <ListItem sx={{padding: 0}}>
                                    <ListItemText
                                        primary="Lazada"
                                    />
                                </ListItem>
                                <ListItem sx={{padding: 0}}>
                                    <ListItemText
                                        primary="Blibli"
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography style={{fontWeight: 'bold'}}>
                                AKUN SAYA
                            </Typography>
                            <List >
                                <ListItem sx={{padding: 0}}>
                                    <ListItemText
                                        primary="Profil Saya"
                                    />
                                </ListItem>
                                <ListItem sx={{padding: 0}}>
                                    <ListItemText
                                        primary="Riwayat Pesanan Saya"
                                    />
                                </ListItem>
                                <ListItem sx={{padding: 0}}>
                                    <ListItemText
                                        primary="Koleksi Hewan"
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography style={{fontWeight: 'bold'}}>
                                KAMI MELAYANI
                            </Typography>
                            <List >
                                <ListItem sx={{padding: 0}}>
                                    <ListItemText
                                        primary="Perawatan Hewan"
                                    />
                                </ListItem>
                                <ListItem sx={{padding: 0}}>
                                    <ListItemText
                                        primary="Klinik Hewan"
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
  );
}