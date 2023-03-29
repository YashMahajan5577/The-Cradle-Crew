import React from "react";
import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";

import Api from "../../routes/api";

const theme = createTheme();

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();

    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // window.location.reload();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("username");
    const password = data.get("password");

    if (email === "") {
      alert("Please enter a valid email");
      return;
    }
    if (password === "") {
      alert("Please enter a valid password");
      return;
    }

    Api.login(email, password, (response) => {
      if (response.data.auth) {
        switch (response.data.type) {
          case "ADMIN":
            navigate("/dashboard/admin");
            break;
          case "PARENT":
            navigate("/dashboard/parent");
            break;
          case "BABYSITTER":
            navigate("/dashboard/babysitter");
            break;
          case "CRECHE":
            navigate("/dashboard/creche");
            break;
        }
      } else {
        alert(response.data.message);
      }
    });
  };

  return (
    <div className="">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color={"success"} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              className="!bg-pink-500 hover:!bg-pink-600"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              {props.type !== "admin" && (
                <Grid item>
                  <Link
                    to={
                      props.type === "parent"
                        ? "/reg/parent"
                        : props.type === "creche"
                        ? "/reg/creche"
                        : "/reg/babysitter"
                    }
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
