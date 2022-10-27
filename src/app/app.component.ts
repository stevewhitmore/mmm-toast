import { Component, OnInit } from '@angular/core';
import { MmmToastService } from 'projects/mmm-toast/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private mmmToastService: MmmToastService) {
  }

  ngOnInit() {
    const globalConfigs = {
    };
    this.mmmToastService.receiveGlobalConfigs(globalConfigs);
  }
}
