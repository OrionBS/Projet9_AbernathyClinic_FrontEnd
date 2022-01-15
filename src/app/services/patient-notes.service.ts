import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {PatientNote} from "../models/patientNote";

@Injectable({
  providedIn: 'root'
})
export class PatientNotesService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.noteUrl;
  }

  public readNotes(patientId: number): Observable<any> {
    return this.http.get(this.url + "?patientId=" + patientId);
  }

  public createNote(patientNote: PatientNote): Observable<any> {
    console.log(patientNote);
    return this.http.post(this.url, patientNote);
  }

  public updateNote(patientNote: PatientNote, noteId: number) {
    patientNote.noteId = noteId;
    console.log(patientNote);
    return this.http.put(this.url, patientNote);
  }

}
