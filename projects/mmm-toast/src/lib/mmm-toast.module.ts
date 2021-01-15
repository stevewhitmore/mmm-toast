import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MmmToastModalComponent } from './mmm-toast-modal.component';
import { MmmToastComponent } from './mmm-toast.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MmmToastComponent,
    MmmToastModalComponent,
  ],
  exports: [
    MmmToastComponent,
  ],
})
export class MmmToastModule { }
