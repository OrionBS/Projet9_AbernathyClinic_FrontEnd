import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Patient} from "../models/patient";
import {PatientService} from "../services/patient.service";
import {PatientNote} from "../models/patientNote";
import {PatientNotesService} from "../services/patient-notes.service";

@Component({
  selector: 'app-patient-informations',
  templateUrl: './patient-informations.component.html',
  styleUrls: ['./patient-informations.component.scss']
})
export class PatientInformationsComponent implements OnInit {

  patient!: Patient;
  patientNotes!: PatientNote[];
  infoMessage!: number;

  constructor(private route: ActivatedRoute, private patientService: PatientService, private patientNotesService: PatientNotesService) {
    this.route.params.subscribe(params => {
      this.loadInformations(params['firstName'], params['lastName'])
    })
  }

  ngOnInit(): void {
  }

  loadInformations(firstName: string, lastName: string) {
    this.patientService.readPatient(firstName, lastName)
      .subscribe(
        data => {
          console.log(data);
          this.patient = data;
          this.patientNotesService.readNotes(this.patient.id)
            .subscribe(
              data => {
                console.log(data);
                this.patientNotes = data;
              },
              error => {
                console.log(error);
              }
            );
        },
        error => {
          console.log(error);
        }
      );

  }

  addPatientNoteToArray(patientNote: PatientNote) {
    this.patientNotes.push(patientNote);
  }

  setInfoMessage(type: number) {
    this.infoMessage = type;
    setTimeout(() => {this.infoMessage = 0;}, 3000);
  }

}
