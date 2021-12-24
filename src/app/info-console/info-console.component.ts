import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-console',
  templateUrl: './info-console.component.html',
  styleUrls: ['./info-console.component.scss']
})
export class InfoConsoleComponent implements OnInit {

  @Input()
  set infoMessage(type: number) {
    if (type) {
      this.infosMessage = type;
    }
  }

  infosMessage: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
