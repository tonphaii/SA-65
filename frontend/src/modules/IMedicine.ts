export interface MedicineInterface {
  ID: number;
  Name: string;
  Type: MedicineTypeInterface;
  MFD: Date;
  EXP: Date;
  Amount: number;
  Storage: StorageInterface;
}


export interface MedicineTypeInterface{
    ID: number,
    Tmedicine: string,
    Utilzation: string, 
}

export interface StorageInterface {
    ID: number,
    Name: string,
}