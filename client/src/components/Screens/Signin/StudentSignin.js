import { useContext,React, useState } from "react";
import { useHistory } from "react-router-dom";
// import { jwt } from "jsonwebtoken";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOpenIcon from "@material-ui/icons/LockOpen";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import LoadingScreen from "../LoadingScreen/LoadingScreen";

import {userContext} from "../../../App";


toast.configure();

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"© "}
      <Link color="inherit" href="https://material-ui.com/">
        Library
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/images/img.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function StudentSigin() {

  const {state, dispatch} = useContext(userContext);


  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const classes = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);

    if (email === "" || password === "") {
      toast.error("Please fill all fields !", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
    } else {
      fetch("http://localhost:3001/api/student/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          // setLoading(false);

          //  toast.success("ueuririr");
          // console.log(result);
          if (result.message === "Success") {
            dispatch({type:"USER", payload:true});
            toast.success("Sweet !", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            history.push("/");
          } else {
            toast.error(`${result.message}`, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  return (
    <>
      {Loading}
      {!Loading && (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOpenIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Student Sign in
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={submitHandler}
              >
                <Grid item xs={12} style={{ marginBottom: "20px" }}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Box mt={3} />
                <Grid container>
                  {/* <Grid item xs>
                    <Link href="forgotpassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item>
                    <Link href="/studentsignup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
}
