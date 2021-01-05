import { Component } from '@angular/core';

import { ToastPositionService } from './toast-position.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mmm-toast Demo';
  toastaPosition: string;

  constructor(private toastCommunicationService: ToastPositionService) {
    this.toastCommunicationService.position$.subscribe(pos => this.toastaPosition = pos);
  }
}
