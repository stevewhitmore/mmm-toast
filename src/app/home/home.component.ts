import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MmmToastService } from 'projects/mmm-toast/src/public-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  demoForm: FormGroup;

  themes = [{
    name: 'Default Theme',
    code: 'default'
  }, {
    name: 'Material Design',
    code: 'material'
  }, {
    name: 'Bootstrap',
    code: 'bootstrap'
  }];

  types = [{
    name: 'Default',
    code: 'default',
  }, {
    name: 'Info',
    code: 'info'
  }, {
    name: 'Success',
    code: 'success'
  }, {
    name: 'Wait',
    code: 'wait'
  }, {
    name: 'Error',
    code: 'error'
  }, {
    name: 'Warning',
    code: 'warning'
  }];

  positions = [{
    name: 'Top Left',
    code: 'top-left',
  }, {
    name: 'Top Center',
    code: 'top-center',
  }, {
    name: 'Top Right',
    code: 'top-right',
  }, {
    name: 'Top Full Width',
    code: 'top-fullwidth',
  }, {
    name: 'Bottom Left',
    code: 'bottom-left',
  }, {
    name: 'Bottom Center',
    code: 'bottom-center',
  }, {
    name: 'Bottom Right',
    code: 'bottom-right',
  }, {
    name: 'Bottom Full Width',
    code: 'bottom-fullwidth',
  }, {
    name: 'Center Center',
    code: 'center-center',
  }];

  constructor(private fb: FormBuilder,
              private mmmToastService: MmmToastService) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.demoForm = this.fb.group({
      title: 'Toast It!',
      message: 'Mmmm, tasties...',
      theme: 'default',
      type: 'success',
      position: 'bottom-right',
      timeout: 5000,
      showClose: true,
      showDuration: true,
    });
  }

  newToast() {
    this.mmmToastService.addToast(this.demoForm.value);
  }

  newCountdownToast() {
    this.mmmToastService.addToast({...this.demoForm.value, isCountdown: true});
  }

  clearLastToast() {
    this.mmmToastService.clearLast();
  }

  clearAllToast() {
    this.mmmToastService.clearAll();
  }

}
