import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import "./Style/patient.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PrescriptionInterface } from "../modules/IPrescription";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
function PrescriptionHistory() {
  const [prescription, setHistory] = React.useState<PrescriptionInterface[]>(
    []
  );

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
          setHistory(res.data);
          console.log(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getPrescriptionHistory();
  }, []);

  const convertType = (d: Date) => {
    const date = new Date(d);
    const d1 = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}น.`;
    return d1;
  };

  <h1>Patient</h1>;

  return (
    <Container className="container" maxWidth="md">
      <Box sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          ประวัติการสั่งยา
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ width: "700" }} aria-label="customized table">
          <TableHead style={{ backgroundColor: "#bdbdbd ", color: "#F4F6F6" }}>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Prescription ID</TableCell>
              <TableCell align="center">ชื่อผู้ป่วย</TableCell>
              <TableCell align="center">อาการป่วย</TableCell>
              <TableCell align="center">ยาที่สั่ง</TableCell>
              <TableCell align="center">เภสัชกร</TableCell>
              <TableCell align="center">วันที่และเวลา</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescription.map((prescriptions: PrescriptionInterface) => (
              <TableRow key={prescriptions.ID}>
                <TableCell component="th" scope="row" align="center">
                  {prescriptions.ID}
                </TableCell>
                <TableCell align="center">
                  {prescriptions.PrescriptionID}
                </TableCell>
                <TableCell align="center">
                  {prescriptions.Patient?.Name}&nbsp;
                  {prescriptions.Patient?.Surname}
                </TableCell>

                <TableCell align="center">{prescriptions.Symptom}</TableCell>
                <TableCell align="center">
                  {prescriptions.Medicine?.Name}
                </TableCell>

                <TableCell align="center">
                  {prescriptions.Employee?.Name}
                </TableCell>
                <TableCell align="center">
                  {convertType(prescriptions?.Case_Time)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PrescriptionHistory;
