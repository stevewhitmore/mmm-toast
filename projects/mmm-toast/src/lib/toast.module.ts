import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToastModalComponent} from './toast-modal.component';
import {ToastComponent} from './toast.component';

import {ToastService} from './services/toast.service';
import {ToastConfigService} from './services/toast-config.service'

@NgModule({
  imports: [CommonModule],
  declarations: [
    ToastModalComponent,
    ToastComponent
  ],
  exports: [
    ToastModalComponent,
    ToastComponent
  ]
})
export class ToastModule {
  static forRoot(): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        ToastConfigService,
        ToastService
      ]
    };
  }
}
