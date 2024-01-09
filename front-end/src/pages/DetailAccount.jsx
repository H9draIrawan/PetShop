import { Outlet } from "react-router-dom";
import {
    Button,
    Box,
    Card,
    Typography as Text,
    TextField, 
    Container
  } from "@mui/material";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    fullname: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    alamat: Yup.string().required(),
    kota: Yup.string().required(),
    no_telp: Yup.number().required(),
    password: Yup.string().required().min(8, "Password too short"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Password confirm is required"),
  });

export default function Detail() {
    return(
        <>
            {/* <h1>Dashboard</h1>
            <Outlet/> */}
            
                <Container maxWidth="sm" style={{ paddingTop:"0px" }}>
                    <Box paddingX={2} width={"200%"}>
                        
                            <Formik
                                initialValues={{
                                fullname: "",
                                username: "",
                                email: "",
                                password: "",
                                confirm_password: "",
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={(values) => {
                                console.log(values);
                                }}
                            >
                                {({
                                errors,
                                touched,
                                values,
                                handleChange,
                                handleBlur,
                                isValid,
                                }) => (
                                <Form>
                                    <Box display={"flex"}>
                                        <Box width={"100%"} marginRight={3}>
                                            <Text gutterBottom> Nama Lengkap</Text>
                                            <TextField
                                            id="fullname-input"
                                            type="text"
                                            name="fullname"
                                            margin="dense"
                                            variant="outlined"
                                            value={values.fullname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.fullname && Boolean(errors.fullname)}
                                            helperText={touched.fullname && errors.fullname}
                                            fullWidth
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
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.username && Boolean(errors.username)}
                                            helperText={touched.username && errors.username}
                                            fullWidth
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
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        fullWidth
                                    />

                                    <Text gutterBottom marginTop={2}>Alamat  </Text>
                                    <TextField
                                        id="alamat-input"
                                        type="text"
                                        name="alamat"
                                        margin="dense"
                                        variant="outlined"
                                        value={values.alamat}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.alamat && Boolean(errors.alamat)}
                                        helperText={touched.alamat && errors.alamat}
                                        fullWidth
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
                                                value={values.kota}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.kota && Boolean(errors.kota)}
                                                helperText={touched.kota && errors.kota}
                                                fullWidth
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
                                                value={values.no_hp}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.no_hp && Boolean(errors.no_hp)}
                                                helperText={touched.no_hp && errors.no_hp}
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>


                                    {/* <TextField
                                    id="new-password"
                                    type="password"
                                    name="password"
                                    label="Password"
                                    margin="dense"
                                    variant="outlined"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    fullWidth
                                    />
                                    <TextField
                                    id="new-password-confirm"
                                    type="password"
                                    name="confirm_password"
                                    label="Confirm Password"
                                    margin="dense"
                                    variant="outlined"
                                    value={values.confirm_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.confirm_password &&
                                        Boolean(errors.confirm_password)
                                    }
                                    helperText={
                                        touched.confirm_password && errors.confirm_password
                                    }
                                    fullWidth
                                    /> */}
                                    <Box marginTop={1} />
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={!isValid}
                                    style={{ width: "100px", marginTop: "10px" }}
                                    >
                                        Edit
                                    </Button>
                                </Form>
                                )}
                            </Formik>

                        {/* <Text gutterBottom>
                            <Link to="/register" style={{ textDecoration: "none" }}>
                                Already have an account
                            </Link>
                        </Text> */}
                    </Box>
                </Container>
        </>
    )
}