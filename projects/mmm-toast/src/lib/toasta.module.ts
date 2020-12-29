import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ToastaComponent } from './toasta.component';
import { ToastComponent } from './toast.component';
import { ToastaService } from './services/toasta.service';
import {ToastaConfigService} from './services/toasta-config.service'

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent, ToastaComponent],
  exports: [ToastComponent, ToastaComponent]
})
export class ToastaModule {
  static forRoot(): ModuleWithProviders<ToastaModule> {
    return {
      ngModule: ToastaModule,
      providers: [ ToastaConfigService, ToastaService ]
    };
  }
}
