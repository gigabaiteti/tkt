import React, { useState, useEffect } from "react";
import qs from "query-string";

import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import usePlans from "../../hooks/usePlans";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../../assets/logo-dark.svg";
import backgroundStep from "../../assets/bg-signup.png";
import { i18n } from "../../translate/i18n";
import "./style.css";
import { openApi } from "../../services/api";
import toastError from "../../errors/toastError";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    "&.MuiButton-root": {
      margin: "20px 0px 16px",
      padding: "10px",
      backgroundColor: "#2E3235",
      borderRadius: "10px",
    },

    "&:hover": {
      backgroundColor: "#585B5D",
      boxShadow: "none",
    },

    backgroundColor: "#2E3235",
    margin: theme.spacing(3, 0, 2),
    WebkitTextFillColor: "#FFFFFF",
  },
}));

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Senha muito curta")
    .max(50, "Senha muito longa")
    .required("Obrigatório"),
  password: Yup.string().min(5, "Senha muito curta").max(50, "Senha muito longa"),
  email: Yup.string().email("E-mail inválido").required("Obrigatório"),
});

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  let companyId = null;

  const params = qs.parse(window.location.search);
  if (params.companyId !== undefined) {
    companyId = params.companyId;
  }

  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    planId: "",
  };

  const [user] = useState(initialState);
  const dueDate = moment().add(3, "day").format();
  const handleSignUp = async (values) => {
    Object.assign(values, { recurrence: "MENSAL" });
    Object.assign(values, { dueDate: dueDate });
    Object.assign(values, { status: "t" });
    Object.assign(values, { campaignsEnabled: true });
    try {
      await openApi.post("/companies/cadastro", values);
      toast.success(i18n.t("signup.toasts.success"));
      history.push("/login");
    } catch (err) {
      console.log(err);
      toastError(err);
    }
  };

  const [plans, setPlans] = useState([]);
  const { getPlanList } = usePlans()

  useEffect(() => {
    const fetchData = async () => {
        const planList = await getPlanList({listPublic: "false"});

        setPlans(planList);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className="geral-signup">
      <div className={"container-signup"}>

        <img alt={"Logo"} src={logo} className="img-logo-signup"></img><br /><br />
          
        <div className={"paper"}>
          <Typography component="h1" variant="h5">Cadastre-se</Typography>
          {/* <form className={classes.form} noValidate onSubmit={handleSignUp}> */}

          <Formik
            initialValues={user}
            enableReinitialize={true}
            validationSchema={UserSchema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                handleSignUp(values);
                actions.setSubmitting(false);
              }, 400);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <p>Nome:</p>
                    <TextField
                      margin="dense"
                      autoComplete="name"
                      name="name"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="Seu nome"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <p>Seu número de Whatsapp:</p>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      id="phone"
                      label="Telefone com (DDD)"
                      name="phone"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      autoComplete="phone"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <p>Dados de acesso</p>
                    <TextField
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      id="email"
                      label={i18n.t("signup.form.email")}
                      name="email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      autoComplete="email"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      name="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      label={i18n.t("signup.form.password")}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="plan-selection">Plano</InputLabel>
                    <Field
                      as={Select}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      id="plan-selection"
                      label="Plano"
                      name="planId"
                      required
                    >
                      {plans.map((plan, key) => (
                        <MenuItem key={key} value={plan.id}>
                          {plan.name} - Atendentes: {plan.users} - WhatsApp:{" "}
                          {plan.connections} - Filas: {plan.queues} - R${" "}
                          {plan.value}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  margin="dense"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {i18n.t("signup.buttons.submit")}
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link
                      href="#"
                      variant="body1"
                      component={RouterLink}
                      to="/login"
                      style={{ color: "#585B5D", fontWeight: 500 }}
                    >Já tem uma conta? Faça login
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className={"container-img-signup"}>
        <div className="img-signup"></div>
      </div>
    </div>
  );
};

export default SignUp;
