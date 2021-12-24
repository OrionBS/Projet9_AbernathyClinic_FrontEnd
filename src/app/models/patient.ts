export class Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  phone: string;

  constructor(id: number, firstName: string, lastName: string, dateOfBirth: Date, gender: string, address: string, phone: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.address = address;
    this.phone = phone;
  }
}
