import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
//theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./navigations/NavBar";
import DrawerBar from "./navigations/DrawerBar";
import Patient from "./components/Patient";
import PatientCreate from "./components/PatientCreate";
import Prescription from "./components/Prescription";
import PrescriptionHistory from "./components/PrescriptionHistory";
import Home from "./components/Home";

const drawerWidth = 240;

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#338064",
      },
      secondary: {
        main: "#8FCCB6",
      },
      text: {
        primary: "#1B2420",
        secondary: "#1B2420",
      },
    },
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [token, setToken] = React.useState<String>("");
  const [statustoken, setStatustoken] = React.useState<boolean>(false);

  const [role, setRole] = React.useState<String>("");

  const [open, setOpen] = React.useState<boolean>(false);

  useEffect(() => {
    const validToken = () => {
      fetch("http://localhost:8080/valid", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.error) {
            setStatustoken(true);
          } else {
            setStatustoken(false);
            localStorage.clear();
          }
        })
        .catch((err) => {
          console.log(err);
          setStatustoken(false);
        });
    };

    const token: any = localStorage.getItem("token");
    const role: any = localStorage.getItem("role");
    if (token) {
      setToken(token);
      setRole(role);
      validToken();
    }
  }, []);

  if (!token || !statustoken) {
    console.log(statustoken);
    return <Signin />;
  }

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{ open?: boolean }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Navbar open={open} onClick={handleDrawerOpen} />
            <DrawerBar
              open={open}
              drawerWidth={drawerWidth}
              handleDrawerClose={handleDrawerClose}
              role={role}
              theme={theme}
            />
            <Main open={open}>
              <DrawerHeader />
              {/* function Route */}
              <Routes>
                {/* Add element here!!!! and role  */}

                {role === "pharmacist" && <Route path="/" element={<Home />} />}
                {role === "pharmacist" && (
                  <Route path="/Prescription" element={<Prescription />} />
                )}
                {role === "pharmacist" && (
                  <Route path="/Patient" element={<Patient />} />
                )}
                {role === "pharmacist" && (
                  <Route
                    path="/PrescriptionHistory"
                    element={<PrescriptionHistory />}
                  />
                )}
                {role === "pharmacist" && (
                  <Route path="/PatientCreate" element={<PatientCreate />} />
                )}
              </Routes>
            </Main>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
