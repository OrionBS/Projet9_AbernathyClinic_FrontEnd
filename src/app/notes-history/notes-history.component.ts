import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../services/patient.service";
import {Patient} from "../models/patient";
import {PatientNote} from "../models/patientNote";
import {PatientNotesService} from "../services/patient-notes.service";

@Component({
  selector: 'app-notes-history',
  templateUrl: './notes-history.component.html',
  styleUrls: ['./notes-history.component.scss']
})
export class NotesHistoryComponent implements OnInit {

  @Output() patientNoteAdded = new EventEmitter<PatientNote>();

  @Input()
  set cardInfos(type: number) {
    if (type) {
      this.selectCardInformations(type);
    }
  }

  @Input()
  set patientInfo(patient: Patient) {
    if (patient) {
      this.patient = patient;
    }
  }

  @Input()
  set patientNoteProps(patientNote: PatientNote) {
    if (patientNote) {
      console.log(patientNote);
      this.patientNote = patientNote;
      this.fillForm(patientNote);
    }
  }

  cardInformations: string[] = [];

  @Output() infosMessage = new EventEmitter<number>();

  patientNote!: PatientNote;
  patient!: Patient;
  noteGroup: FormGroup;

  constructor(private builder: FormBuilder, private patientNotesService: PatientNotesService) {
    this.noteGroup = builder.group({
      patientId: [null],
      dateOfCreation: [null],
      practitionerNote: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.infosMessage.emit(0);
    if (this.patientNote) {
      this.patientNotesService.updateNote(this.noteGroup.value, this.patientNote.noteId)
        .subscribe(
          data => {
            console.log(data);
            this.infosMessage.emit(6);
          },
          error => {
            console.log(error);
            this.infosMessage.emit(7);
          }
        );
    } else {
      this.patientNotesService.createNote(this.noteGroup.value)
        .subscribe(
          data => {
            console.log(data);
            this.infosMessage.emit(8);
            this.noteGroup.controls['practitionerNote'].setValue("");
            this.patientNoteAdded.emit(data);
          },
          error => {
            console.log(error);
            this.infosMessage.emit(9);
          }
        );
    }
  }

  fillForm(patientNote: PatientNote) {
    if (patientNote) {
      this.noteGroup.controls['patientId'].setValue(patientNote.patientId);
      this.noteGroup.controls['dateOfCreation'].setValue(patientNote.dateOfCreation);
      this.noteGroup.controls['practitionerNote'].setValue(patientNote.practitionerNote);
    }
  }

  selectCardInformations(type: number) {

    if (type == 1) {
      this.cardInformations = [
        "Ajouter une nouvelle note",
        "Ajouter"
      ];
    }
    if (type == 2) {
      this.cardInformations = [
        "Note précédente",
        "Modifier"
      ]
    }
  }

}
