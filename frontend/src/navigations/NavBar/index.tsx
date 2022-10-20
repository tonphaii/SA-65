import { Toolbar, IconButton, Typography, Box} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import React, { useEffect } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { EmployeeInterface } from "../../modules/IEmployee";
import Button from "@mui/material/Button";
import MedicationIcon from "@mui/icons-material/Medication";
const drawerWidth = 240;

export default function Navbar({ open, onClick }: any) {
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const [employee, setEmployee] = React.useState<EmployeeInterface>();
  const navigator = useNavigate();
  const handleSignOutClick = (e: any) => {
    localStorage.clear();
    navigator("/");
    window.location.reload();
  };
  const getEmployee = () => {
    const apiUrl = "http://localhost:8080/pharmacist";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/employee/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setEmployee(res.data);
        }
      });
  };
  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onClick}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}>
          <MenuIcon />
        </IconButton>
        <MedicationIcon fontSize="large"></MedicationIcon>
        <Typography variant="h6" noWrap component="div">
          Prescription
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex" }}>
          {/* <IconButton size="large" color="inherit"> */}
            <Button  onClick={handleSignOutClick} style={{ border: "2px solid ", color: "#F4F6F6" }}>
              {employee?.Name} {employee?.Surname}{" "}&nbsp;
               <ExitToAppIcon></ExitToAppIcon>
            </Button>
           
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}
