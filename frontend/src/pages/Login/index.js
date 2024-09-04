import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { i18n } from "../../translate/i18n";
import "./style.css";
import { AuthContext } from "../../context/Auth/AuthContext";
import logo from "../../assets/logo-dark.svg";
import logo_developer from "../../assets/logo-developer.svg";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(to right, #2E3235 , #585B5D , #FFFFFF)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  paper: {
    backgroundColor: theme.palette.login, //DARK MODE//
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "55px 30px",
    borderRadius: "12.5px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    "&.MuiButton-root": {
      margin: "16px 0px 16px",
      padding: "10px",
      backgroundColor: "#2E3235)",
      borderRadius: "10px",
      width: "100%"
    },
    "&:hover": {
      backgroundColor: "#585B5D",
      // boxShadow: "none",
    },

    backgroundColor: "#2E3235)",
    margin: theme.spacing(3, 0, 2),
    WebkitTextFillColor: "#FFFFFF",
    width: "50%",
  },
  powered: {
    color: "white",
  },
  input: {
    "& .MuiOutlinedInput-root": {
      position: "relative",
      borderRadius: "10px",
    },
  },
}));

const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });

  const { handleLogin } = useContext(AuthContext);

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    handleLogin(user);
  };

  return (
    <div className="geral">
      <CssBaseline />
      <div className={"container-login"}>
        <div className={"container-img"}>
          <img alt={"Logo"} src={logo} className="img-login"></img>
        </div>
        <div className="container-footer">
          <p>
            <a href={"https://www.gigabaite.com.br"} target={"_blank"}>
              <img alt={"Logo"} src={logo_developer} height="30"></img>
            </a>{" "}
          </p>
        </div>
      </div>
      <div className={"container-right"}>
        <div className={"box"}>
          <form className={classes.form} noValidate onSubmit={handlSubmit}>

            <Typography component="h1" variant="h4" style={{ color: "#2E3235" }}>Identifique-se</Typography> <br />

            <TextField
              className={classes.input}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="email"
              label={i18n.t("login.form.email")}
              name="email"
              value={user.email}
              onChange={handleChangeInput}
              autoComplete="email"
              autoFocus
              inputProps={{
                style: {
                  borderRadius: "10px",
                  height: "30px",
                  padding: "12px",
                  backgroundColor: "#D5D6D7"
                },
              }}
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="dense" 
              required
              fullWidth
              name="password"
              label={i18n.t("login.form.password")}
              type="password"
              id="password"
              value={user.password}
              onChange={handleChangeInput}
              autoComplete="current-password"
              inputProps={{
                style: {
                  borderRadius: "10px",
                  height: "30px",
                  padding: "12px",
                  backgroundColor: "#D5D6D7",
                },
              }}
            />

            <Button
              type="submit" 
              fullWidth 
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {i18n.t("login.buttons.submit")}
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  variant="body2"
                  component={RouterLink}
                  to="/signup"
                >Não possui uma conta? Cadastre-se
                </Link>
              </Grid>
            </Grid>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
