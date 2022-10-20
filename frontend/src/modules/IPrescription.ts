import { MedicineInterface } from './IMedicine'
import { PatientInterface } from './IPatient';
import { EmployeeInterface } from './IEmployee';

export interface PrescriptionInterface {
	
	ID?: number,
	PrescriptionID: string,

	MedicineID?: number,
	Medicine?: MedicineInterface,

	PatientID?: number,
	Patient?:PatientInterface,

	EmployeeID?: number,
	Employee?:EmployeeInterface,

	Symptom:string,
	Case_Time: Date  ,
}


  