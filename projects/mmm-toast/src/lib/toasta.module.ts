import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ToastaComponent } from './toasta.component';
import { ToastComponent } from './toast.component';
import { SafeHtmlPipe } from './shared';
import { ToastaService, ToastaConfig, ToastaServiceFactory } from './toasta.service';

export let providers = [
  ToastaConfig,
  { provide: ToastaService, useFactory: ToastaServiceFactory, deps: [ToastaConfig] }
];

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent, ToastaComponent, SafeHtmlPipe],
  exports: [ToastComponent, ToastaComponent],
  providers
})
export class ToastaModule {
  static forRoot(): ModuleWithProviders<ToastaModule> {
    return {
      ngModule: ToastaModule,
      providers
    };
  }
}
