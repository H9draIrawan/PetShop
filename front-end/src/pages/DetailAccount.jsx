import { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography as Text,
  TextField,
  Container,
  Snackbar,
  Alert
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const userSchema = Yup.object({
  nama: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  alamat: Yup.string().required(),
  kota: Yup.string().required(),
  no_hp: Yup.number().required(),
}).required();

export default function Detail() {
  const [isEdit, setEdit] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [toastSuccess, setToastSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      alamat: "",
      email: "",
      kota: "",
      nama: "",
      no_hp: "",
      username: "",
    },
    values: profileData,
    disabled: !isEdit,
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem("user"));
    const getUserData = async () => {
      const data = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${localUserData._id}`)

      setProfileData(data.data);
    };

    getUserData();
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(true);
  }

  const onSubmit = async (data) => {
    if(!isEdit) return;

    const localUserData = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/${localUserData._id}`,
        {
          nama: data.nama,
          username: data.username,
          email: data.email,
          password: data.password,
          alamat: data.alamat,
          kota: data.kota,
          no_hp: data.no_hp,
        },
      );

      setToastSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setEdit(false);
      setTimeout(() => setToastSuccess(false)
        , 1500);
    }
  }

  return (
    <>
      <Container maxWidth="sm" style={{ paddingTop: "0px" }}>
        <Box paddingX={2} width={"200%"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display={"flex"}>
              <Box width={"100%"} marginRight={3}>
                <Text gutterBottom> Nama</Text>
                <TextField
                  id="fullname-input"
                  type="text"
                  name="fullname"
                  margin="dense"
                  variant="outlined"
                  error={errors.nama?.message}
                  helperText={errors.nama?.message}
                  fullWidth
                  {...register("nama")}
                />
              </Box>
              <Box marginX={"auto"} width={"100%"}>
                <Text gutterBottom>Username </Text>
                <TextField
                  id="username-input"
                  type="text"
                  name="username"
                  margin="dense"
                  variant="outlined"
                  error={errors.username?.message}
                  helperText={errors.username?.message}
                  fullWidth
                  {...register("username")}
                />
              </Box>
            </Box>

            <Text gutterBottom marginTop={2}>Email </Text>
            <TextField
              id="email-input"
              type="email"
              name="email"
              margin="dense"
              variant="outlined"
              error={errors.email?.message}
              helperText={errors.email?.message}
              fullWidth
              {...register("email")}
            />

            <Text gutterBottom marginTop={2}>Alamat  </Text>
            <TextField
              id="alamat-input"
              type="text"
              name="alamat"
              margin="dense"
              variant="outlined"
              error={errors.alamat?.message}
              helperText={errors.alamat?.message}
              fullWidth
              {...register("alamat")}
            />

            <Box display={"flex"}>
              <Box width={"100%"} marginRight={3}>
                <Text gutterBottom marginTop={2}>Kota  </Text>
                <TextField
                  id="kota-input"
                  type="text"
                  name="kota"
                  margin="dense"
                  variant="outlined"
                  error={errors.kota?.message}
                  helperText={errors.kota?.message}
                  fullWidth
                  {...register("kota")}
                />
              </Box>

              <Box marginX={"auto"} width={"100%"}>
                <Text gutterBottom marginTop={2}>Nomor Telepon  </Text>
                <TextField
                  id="no_hp-input"
                  type="text"
                  name="no_hp"
                  margin="dense"
                  variant="outlined"
                  error={errors.no_hp?.message}
                  helperText={errors.no_hp?.message}
                  fullWidth
                  {...register("no_hp")}
                />
              </Box>
            </Box>
            <Box marginTop={1} />
            {
              isEdit ?
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={Object.keys(errors).length > 0}
                  style={{ width: "100px", marginTop: "10px" }}
                >
                  Save
                </Button>
                :
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    style={{ width: "100px", marginTop: "10px"}}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                  <Button
                  variant="contained"
                  color="error"
                  type="button"
                  style={{ width: "150px", marginTop: "10px"}}
                  onClick={handleEdit}
                >
                  Delete Account
                </Button>
              </Box>
            }
          </form>

          {
            // snackbar on success edit
          }
          <Snackbar
            open={toastSuccess}
            autoHideDuration={1500}
            message="Success Edit Profile"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              Success Edit Profile
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </>
  )
}
