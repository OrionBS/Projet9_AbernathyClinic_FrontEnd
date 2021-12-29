import {Component, Input, OnInit} from '@angular/core';
import {DiabeteRiskService} from "../services/diabete-risk.service";
import {Patient} from "../models/patient";
import {ActivatedRoute} from "@angular/router";
import {last} from "rxjs";

@Component({
  selector: 'app-diabetes-risk',
  templateUrl: './diabetes-risk.component.html',
  styleUrls: ['./diabetes-risk.component.scss']
})
export class DiabetesRiskComponent implements OnInit {

  riskLevel: number = 0;
  firstName!: string;
  lastName!: string;

  constructor(private diabeteRiskService: DiabeteRiskService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.firstName = params['firstName'];
      this.lastName = params['lastName'];
    })
  }

  ngOnInit(): void {
    this.diabeteRiskService.generateDiabeteRiskByFirstNameAndLastName(this.firstName,this.lastName)
      .subscribe(
        (next: any) => {
          console.log(next)
          this.riskLevel = next.riskLevel;
        },
        (error) => {
          console.error(error);
        }
      );
  }

}
