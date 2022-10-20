import React, { useEffect } from "react";
// import { BrowserRouter} from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
// import "./Style/patient.css";
import Typography from "@mui/material/Typography";
import { PatientInterface } from "../modules//IPatient";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
function Patient() {
  const [patient, setPatient] = React.useState<PatientInterface[]>([]);
  const getPatient = async () => {
    const apiUrl = "http://localhost:8080/pharmacist/patients";
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
          setPatient(res.data);
          console.log(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "PID",
      headerName: "PID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Name",
      headerName: "ชื่อ",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Surname",
      headerName: "นามสกุล",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Age",
      headerName: "อายุ",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Gender",
      headerName: "เพศ",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Allergy",
      headerName: "ประวัติแพ้ยา",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
  ];

  useEffect(() => {
    getPatient();
  }, []);

  <h1>Patient</h1>;

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลผู้ป่วย
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/PatientCreate"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>

        <DataGrid
          style={{ width: "92%", marginTop: "20px" }}
          autoHeight={true}
          rows={patient}
          getRowId={(row) => row.ID}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Container>
    </div>
  );
}

export default Patient;
