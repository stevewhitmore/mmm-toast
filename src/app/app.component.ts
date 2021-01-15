import { Component, OnInit } from '@angular/core';
import { MmmToastService } from 'projects/mmm-toast/src/public-api'

@Component({
  selector: 'app-root',
  template: `
    <section>

    <header>
      <div>
        <h1>mmm-toast Demo</h1>
        <p>Easy toast notification for Angular</p>
      </div>
    </header>

    <app-home></app-home>

    <footer>
      Released under the <a href="https://github.com/stevewhitmore/mmm-toast/blob/master/LICENSE">MIT</a> license. <a
        href="https://github.com/stevewhitmore/mmm-toast">View source</a>.
    </footer>

    <mmm-toast></mmm-toast>

    </section>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private mmmToastService: MmmToastService) {
  }

  ngOnInit() {
    const globalConfigs = {
      showClose: false,
      timeout: 300,
    };
    this.mmmToastService.receiveGlobalConfigs(globalConfigs);
  }
}
