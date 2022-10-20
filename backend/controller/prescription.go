package controller

import (
	"github.com/tonphaii/Project-sa-65/entity"

	"net/http"

	"github.com/gin-gonic/gin"
)

func CreatePrescription(c *gin.Context) {
	var prescription entity.Prescription
	var patient entity.Patient
	var medicine entity.Medicine
	var employee entity.Employee

	if err := c.ShouldBindJSON(&prescription); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", prescription.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", prescription.MedicineID).First(&medicine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicine not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", prescription.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	pr := entity.Prescription{
		PrescriptionID: prescription.PrescriptionID,
		Patient:        patient,                // โยงความสัมพันธ์กับ Entity Resolution
		Medicine:       medicine,               // โยงความสัมพันธ์กับ Entity Video
		Employee:       employee,               // โยงความสัมพันธ์กับ Entity Playlist
		Symptom:        prescription.Symptom,   // โยงความสัมพันธ์กับ Entity
		Case_Time:      prescription.Case_Time, // ตั้งค่าฟิลด์ watchedTime
	}

	//บันทึก
	if err := entity.DB().Create(&pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}
	c.JSON(http.StatusOK, gin.H{"data": pr})

}

func GetPrescription(c *gin.Context) {
	var prescriptions entity.Prescription
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM prescriptions WHERE id = ?", id).
		Scan(&prescriptions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": prescriptions})
}
func ListPrescription(c *gin.Context) {
	var prescriptions []entity.Prescription
	if err := entity.DB().Preload("Medicine").Preload("Patient").Preload("Employee").Raw("SELECT * FROM prescriptions").Find(&prescriptions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prescriptions})

}

func DeletePrescription(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM prescriptions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prescription not found"})
		return

	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdatePrescription(c *gin.Context) {
	var prescriptions entity.Prescription
	if err := c.ShouldBindJSON(&prescriptions); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", prescriptions.ID).First(&prescriptions); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prescription not found"})

	}
	if err := entity.DB().Save(&prescriptions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prescriptions})
}
