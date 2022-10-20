import React, { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
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
import { PrescriptionInterface } from "../modules/IPrescription";
import { MedicineInterface } from "../modules/IMedicine";
import { EmployeeInterface } from "../modules/IEmployee";
import { PatientInterface } from "../modules/IPatient";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import "./Style/patient.css";
import {
  GetPatient,
  GetMedicine,
  Get_Patient,
  Get_Medicine,
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Prescriptions() {
  const [prescription, setPrescription] = useState<
    Partial<PrescriptionInterface>
  >({ Case_Time: new Date() });
  const [medicine, setMedicine] = useState<MedicineInterface[]>([]);
  const [m, setMedicine1] = useState<MedicineInterface>();
  const [employee, setEmployee] = useState<EmployeeInterface>();

  const [patient, setPatient] = useState<PatientInterface[]>([]);
  const [p, setPatient1] = useState<PatientInterface>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [prescriptionID, setPrescriptionID] = useState("");

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

  //select
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof prescription;
    setPrescription({ ...prescription, [name]: event.target.value });
    console.log(name);

    if (name === "PatientID") {
      localStorage.setItem("PID", event.target.value);
      get_Patient();
    }
    if (name === "MedicineID") {
      localStorage.setItem("MID", event.target.value);
      get_Medicine();
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Prescriptions;
    const { value } = event.target;
    setPrescription({ ...prescription, [id]: value });
  };

  const getEmployee = async () => {
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

  const getPrescriptionHistory = async () => {
    const apiUrl = "http://localhost:8080/pharmacist/prescriptions";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          var len = res.data.length + 1;
          var pid;
          if (len >= 0 && len <= 9) {
            pid = "P0000" + len;
          } else if (len >= 10 && len <= 19) {
            pid = "P000" + len;
          } else if (len >= 100 && len <= 199) {
            pid = "P00" + len;
          } else if (len >= 1000 && len <= 1999) {
            pid = "P0" + len;
          }
          console.log(pid);
          setPrescriptionID(pid ?? "");
        } else {
          console.log("else");
        }
      });
  };

  const getMedicine = async () => {
    //list
    let res = await GetMedicine();
    if (res) {
      setMedicine(res);
    }
  };
  const get_Medicine = async () => {
    //id
    let res = await Get_Medicine();
    if (res) {
      setMedicine1(res);
    }
  };
  const get_Patient = async () => {
    let res = await Get_Patient();
    prescription.PatientID = res.PID;
    if (res) {
      setPatient1(res);
    }
    console.log(res);
  };
  const getPatient = async () => {
    let res = await GetPatient();
    prescription.PatientID = res.PID;
    if (res) {
      setPatient(res);
    }
    console.log(res);
  };
  useEffect(() => {
    getEmployee();
    getMedicine();
    getPatient();
    getPrescriptionHistory();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      PrescriptionID: prescriptionID,
      EmployeeID: convertType(employee?.ID) ?? "",
      MedicineID: convertType(prescription?.MedicineID) ?? "",
      PatientID: convertType(prescription?.PatientID) ?? "",
      Symptom: prescription?.Symptom ?? "",
      Case_Time: prescription?.Case_Time ?? "",
    };
    console.log(data);

    const apiUrl = "http://localhost:8080/pharmacist/prescription";
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
              Create Prescription
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={1} sx={{ padding: 1 }}>
          <Grid item xs={8}>
            <p>กรุณาเลือกไอดีของผู้ป่วย</p>
            <FormControl style={{width: "200px"}} variant="outlined">
              <Select
                id="ID"
                native
                name="PatientID"
                size="medium"
                value={String(prescription?.PatientID)}
                onChange={handleChange}
                inputProps={{
                  name: "PatientID",
                }}
              ><option></option>
                {patient.map((item: PatientInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.PID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <p>เภสัชกรผู้สั่งยา</p>
            <FormControl fullWidth variant="outlined">
              <Select
                label="Pharmacist"
                id="Pharmacist"
                size="medium"
                native
                disabled
                variant="filled"
                value={prescription?.EmployeeID || ""}
              >
                <option value={employee?.ID} key={employee?.ID}>
                  {employee?.Name} {employee?.Surname}
                </option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3.5}>
            <p>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                type="string"
                size="medium"
                variant="filled"
                value= {p?.Name} 
              />
            </FormControl>
          </Grid>
          <Grid item xs={3.5}>
            <p>สกุล</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                type="string"
                size="medium"
                variant="filled"
                value={ p?.Surname}
              />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <p>อายุ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                type="number"
                size="medium"
                variant="filled"
                value={p?.Age || ""}
              />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <p>เพศ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                type="string"
                size="medium"
                variant="filled"
                value={p?.Gender || ""}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <p>ประวัติแพ้ยา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                type="string"
                size="medium"
                variant="filled"
                value={p?.Allergy || ""}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <p>อาการป่วย</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Symptom"
                variant="outlined"
                size="medium"
                value={prescription.Symptom || ""}
                onChange={handleInputChange}
                placeholder="กรอกอาการป่วย"
              />
            </FormControl>
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <p>ยาที่สั่ง</p>
            <FormControl fullWidth variant="outlined">
              <Select
                id="ID"
                variant="outlined"
                native
                size="medium"
                value={prescription?.MedicineID + ""}
                inputProps={{
                  name: "MedicineID",
                }}
                onChange={handleChange}
              >
                <option aria-label="None" value=""></option>
                {medicine.map((item: MedicineInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <p>ประเภทยา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                type="string"
                size="medium"
                variant="filled"
                value={m?.Type.Utilzation || ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3.5}>
            <p>วันที่และเวลา</p>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date/Time"
                  // inputFormat="MM/DD/YYYY"
                  value={prescription.Case_Time}
                  onChange={(newValue) => {
                    const id = "Case_Time" as keyof typeof prescription;
                    console.log(typeof newValue);
                    setPrescription({ ...prescription, [id]: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6.5} >
           
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

export default Prescriptions;
