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
            
                <Container maxWidth="sm">
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
                                            <Text gutterBottom>Nama Tampilan </Text>
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

                                    <Text gutterBottom>Alamat Email </Text>
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
                                    {/* <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={!isValid}
                                    fullWidth
                                    >
                                    Register
                                    </Button> */}
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