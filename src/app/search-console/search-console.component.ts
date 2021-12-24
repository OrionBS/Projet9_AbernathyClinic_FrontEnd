import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../services/patient.service";
import {Patient} from "../models/patient";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-console',
  templateUrl: './search-console.component.html',
  styleUrls: ['./search-console.component.scss']
})
export class SearchConsoleComponent implements OnInit {

  searchGroup: FormGroup;

  @Output() infosMessage = new EventEmitter<number>();

  errorSearch: boolean = false;

  constructor(private builder: FormBuilder, private patientService: PatientService, private router: Router) {
    this.searchGroup = builder.group({
      lastName: [null, Validators.required],
      firstName: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  public searchPatient() {
    this.infosMessage.emit(0);
    this.patientService.readPatient(this.searchGroup.controls['firstName'].value, this.searchGroup.controls['lastName'].value)
      .subscribe(
        data => {
          console.log(data);
          const patient: Patient = data;
          this.router.navigate(['patientInformations', patient.firstName, patient.lastName]);
        },
        error => {
          this.infosMessage.emit(1);
          console.log(error);
        }
      );
  }

}
