import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DiabeteRiskService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.diabeteRisk;
  }

  public generateDiabeteRiskByFirstNameAndLastName(firstName: string, lastName: string) {
    return this.http.get(this.url + "/name?firstName=" + firstName + "&lastName=" + lastName);
  }

  public generateDiabeteRiskById(patientId: number) {
     return this.http.get(this.url+"/id?patientId="+patientId);
  }
}
