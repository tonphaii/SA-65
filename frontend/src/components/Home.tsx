import React from "react";
import prescription from "./image/prescription.jpg"; //
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
// import { createStyles, makeStyles, Theme } from "@mui/material/styles";
import './Style/style.css'

function Home() {
  
  

  return (
    <div>
      <Container className="container" maxWidth="md">
        <Typography align="center">
          <img
            style={{ width: "500px" }}
            className="img"
            src={prescription}/>
        </Typography>

     
        <h4>Requirements</h4>
        <p>
          ระบบสั่งยา เป็นระบบที่ให้เภสัชกรภายในโรงพยาบาลแห่งหนึ่งสามารถ Login
          เข้าสู่ระบบมาเพื่อทำหน้าที่สั่งยาให้กับผู้ป่วยแต่ละคน
          โดยการสั่งยาของผู้ป่วยแต่ละคนนั้น
          เจ้าหน้าที่จะต้องกรอกข้อมูลของผู้ป่วย เลือกชื่อยาที่ต้องจ่าย
          เก็บไว้รายการยา จากนั้นเมื่อทำการกดบันทึกรายการเรียบร้อยแล้ว
          ระบบจะบันทึกข้อมูลที่ทำรายการพร้อมกับช่วงวันเวลาที่ทำรายการไปที่ใบสั่งยา
          <br />
          ระบบสั่งยา
          เป็นระบบที่ให้เจ้าหน้าที่แต่ละคนสามารถเรียกดูประวัติการทำรายการย้อนหลังได้ว่า
          รายการไหนเป็นของผู้ป่วยชื่อว่าอะไร มีประวัติการใช้ยาตัวไหนบ้าง
          และทำรายการในช่วงวันเวลาไหน
        </p> 
      </Container>
    </div>
  );
}
export default Home;
