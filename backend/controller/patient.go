package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/tonphaii/Project-sa-65/entity"

	"net/http"
)

func CreatePatients(c *gin.Context) {
	var patient entity.Patient

	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// p := &entity.Patient{

	// 	PID:     patient.PID,
	// 	Name:    patient.Name,
	// 	Surname: patient.Surname,
	// 	Age:     patient.Age,
	// 	Gender:  patient.Gender,
	// 	Allergy: patient.Allergy,
	// }

	if err := entity.DB().Create(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patient})
}

func GetPatients(c *gin.Context) {
	var patients entity.Patient
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM patients WHERE id = ?", id).
		Scan(&patients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patients})
}

func ListPatients(c *gin.Context) {

	var patients []entity.Patient

	if err := entity.DB().Raw("SELECT * FROM patients").Scan(&patients).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": patients})

}

func DeletePatients(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM patients WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdatePatients(c *gin.Context) {

	var patients entity.Patient

	if err := c.ShouldBindJSON(&patients); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", patients.ID).First(&patients); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})

		return

	}

	if err := entity.DB().Save(&patients).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": patients})

}
