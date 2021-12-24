import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";
import {Patient} from "../models/patient";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.patientUrl;
  }

  public readPatient(firstName: string, lastName: string): Observable<any> {
    return this.http.get(this.url + "?firstName=" + firstName + "&lastName=" + lastName);
  }

  public createPatient(patient: Patient): Observable<any> {
    console.log(patient);
    return this.http.post(this.url,patient);
  }

  public updatePatient(patient: Patient, patientId: number) {
    patient.id = patientId;
    console.log(patient);
    return this.http.put(this.url,patient);
  }
}
