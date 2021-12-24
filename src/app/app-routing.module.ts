import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PatientInformationsComponent} from "./patient-informations/patient-informations.component";

const routes: Routes = [
  {path: "patientInformations/:firstName/:lastName", component: PatientInformationsComponent},
  {path: "home", component: HomeComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "**", redirectTo: "", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
