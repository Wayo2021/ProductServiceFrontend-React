import { useForm } from "react-hook-form";
import {
  Grid,
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import api from "../../services/authUserAPI"

const Login = () => {
  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onSubmit function
  const onSubmit = (data: any) => {
    // console.log(data);

    //Call API
    //Payload
    const authData = {
      "username": data.username,
      "password": data.password
    }

    api.authLogin(authData).then((response: any) => {
      console.log("THIS THIS RESPONSE ==>> ", response)
      if (response.status === 200) {
        console.log("Login Success")
      }

      localStorage.setItem("token", response.data.token)

      window.location.href = "/backend/dashboard"
    }).catch((error) => {
      console.log("THIS THIS ERROR ==>> ", error)
    })
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h5" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              autoFocus
              label="Username"
              type="text"
              variant="outlined"
              {...register("username", { required: true, minLength: 5 })}
              error={errors.username ? true : false}
              helperText={errors.username ? "Username is required" : ""}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              {...register("password", { required: true })}
              error={errors.password ? true : false}
              helperText={errors.password ? "Password is required" : ""}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              sx={{ mt: 3, mb: 3 }}
            >
              Submit
            </Button>

            <Grid container>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid component="div">
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ textDecoration: "none", color: "primary.main" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid component="div">
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ textDecoration: "none", color: "primary.main" }}
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
