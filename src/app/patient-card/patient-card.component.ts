import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Patient} from "../models/patient";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../services/patient.service";
import {compareNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {

  @Input()
  set patient(patient: Patient) {
    if (patient) {
      this.patientId = patient.id;
    }
    this.fillForm(patient);
  }

  @Input()
  set cardInfos(type: number) {
    if (type) {
      this.selectCardInformations(type);
    }
  }

  cardInformations: string[] = [];

  @Output() infosMessage = new EventEmitter<number>();

  patientId!: number;

  patientGroup: FormGroup;

  constructor(private builder: FormBuilder, private patientService: PatientService, private router: Router) {
    this.patientGroup = builder.group({
      lastName: [null, Validators.required],
      firstName: [null, Validators.required],
      gender: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      address: [null, Validators.required],
      phone: [null, Validators.required]
    });
  }


  ngOnInit(): void {
  }

  fillForm(patient: Patient) {
    if (patient) {
      this.patientGroup.controls['lastName'].setValue(patient.lastName);
      this.patientGroup.controls['firstName'].setValue(patient.firstName);
      this.patientGroup.controls['gender'].setValue(patient.gender);
      this.patientGroup.controls['dateOfBirth'].setValue(patient.dateOfBirth);
      this.patientGroup.controls['address'].setValue(patient.address);
      this.patientGroup.controls['phone'].setValue(patient.phone);
    }
  }

  onSubmit(){
    this.infosMessage.emit(0);
    if (this.patientId) {
      this.patientService.updatePatient(this.patientGroup.value,this.patientId)
        .subscribe(
          data => {
            console.log(data);
            this.infosMessage.emit(2);
          },
          error => {
            console.log(error);
            this.infosMessage.emit(3);
          }
        );
    } else {
      this.patientService.createPatient(this.patientGroup.value)
        .subscribe(
          data => {
            console.log(data);
            this.infosMessage.emit(4);
            let patient: Patient = data;
            this.router.navigate(['patientInformations', patient.firstName, patient.lastName]);
          },
          error => {
            console.log(error);
            this.infosMessage.emit(5);
          }
        );
    }
  }

  selectCardInformations(type: number) {

    if (type == 1) {
      this.cardInformations = [
        "Ajouter un nouveau patient.",
        "Créer"
      ];
    }
    if (type == 2) {
      this.cardInformations = [
        "Mettre à jour le patient",
        "Mettre à jour"
      ]
    }
  }

}
