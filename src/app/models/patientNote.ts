export class PatientNote {
  noteId: number;
  patientId: number;
  practitionerNote: string;

  constructor(noteId: number, patientId: number, practitionerNote: string) {
    this.noteId = noteId;
    this.patientId = patientId;
    this.practitionerNote = practitionerNote;
  }
}
