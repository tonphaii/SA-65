import React, { useEffect } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import "./Style/patient.css";
import { PatientInterface } from "../modules//IPatient";
import MenuItem from "@mui/material/MenuItem";
import { GetPatient } from "../services/HttpClientService";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function PatientCreate() {
  // const [date, setDate] = React.useState<Date | null>(null);
  const [patient, setPatient] = React.useState<Partial<PatientInterface>>({});
  const [patient1, setPatient1] = React.useState<PatientInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [pid, setPID] = React.useState("");
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof PatientCreate;
    const { value } = event.target;
    setPatient({ ...patient, [id]: value });
  };

  const getPatient = async () => {
    let res = await GetPatient();

    if (res) {
      setPatient1(res);
      var len = res.length + 1;
      var pid;
      if (len >= 0 && len <= 9) {
        pid = "P000" + len;
      } else if (len >= 10 && len <= 19) {
        pid = "P00" + len;
      } else if (len >= 100 && len <= 199) {
        pid = "P0" + len;
      } else if (len >= 1000 && len <= 1999) {
        pid = "P" + len;
      }
      setPID(pid ?? "");
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const a = event.target.value as keyof typeof patient;
    const name = event.target.name as keyof typeof patient;
    setPatient({ ...patient, [name]: a });
    console.log(name);
  };

  function submit() {
    let data = {
      PID: pid ?? "",
      Name: patient.Name ?? "",
      Surname: patient.Surname ?? "",
      Age: Number(patient.Age),
      Gender: patient.Gender ?? "",
      Allergy: patient.Allergy ?? "",
    };
    console.log(data);

    const apiUrl = "http://localhost:8080/pharmacist/patient";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }
  useEffect(() => {
    getPatient();
  }, []);

  

  return (
    <Container className="container" maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>

      <Paper className="paper" elevation={3}>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Create Patient
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Grid container spacing={1} sx={{ padding: 1 }}>
          
          <Grid item xs={12}>
            <Divider />
            <FormControl sx={{ width: 200 }} variant="outlined">
              <p>PID</p>
              <TextField
                id="PID"
               
                variant="outlined"
                type="string"
                size="medium"
                value={pid || ""}
                onChange={handleInputChange}
                disabled
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                placeholder="กรุณากรอกชื่อ"
                variant="outlined"
                type="string"
                size="medium"
                value={patient.Name || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>นามสกุล</p>
              <TextField
                id="Surname"
                placeholder="กรุณากรอกนามสกุล"
                variant="outlined"
                type="string"
                size="medium"
                value={patient.Surname || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อายุ</p>
              <TextField
                id="Age"
                placeholder="กรุณากรอกอายุ"
                variant="outlined"
                type="number"
                size="medium"
                InputProps={{ inputProps: { min: 1, max: 100 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={patient.Age || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                id="gender"
                name="Gender"
               
                value={patient.Gender || ""}
                onChange={handleChange}
              >
              <MenuItem value={""}>กรุณาเลือกเพศ</MenuItem>
                <MenuItem value={"หญิง"}>หญิง</MenuItem>
                <MenuItem value={"ชาย"}>ชาย</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ประวัติแพ้ยา</p>
              <TextField
                id="Allergy"
                placeholder="กรุณากรอกประวัติแพ้ยา"
                variant="outlined"
                type="string"
                size="medium"
                value={patient.Allergy || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button component={RouterLink} to="/Patient" variant="contained">
              Back
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PatientCreate;
