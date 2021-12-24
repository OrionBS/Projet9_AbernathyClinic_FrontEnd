import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PatientCardComponent} from './patient-card/patient-card.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { NotesHistoryComponent } from './notes-history/notes-history.component';
import { DiabetesRiskComponent } from './diabetes-risk/diabetes-risk.component';
import { HomeComponent } from './home/home.component';
import { SearchConsoleComponent } from './search-console/search-console.component';
import { InfoConsoleComponent } from './info-console/info-console.component';
import { PatientInformationsComponent } from './patient-informations/patient-informations.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientCardComponent,
    NotesHistoryComponent,
    DiabetesRiskComponent,
    HomeComponent,
    SearchConsoleComponent,
    InfoConsoleComponent,
    PatientInformationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
