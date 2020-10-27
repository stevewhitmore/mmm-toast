import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ToastyComponent } from './toasty.component';
import { ToastComponent } from './toast.component';
import { SafeHtmlPipe } from './shared';
import { ToastyService, ToastyConfig, ToastyServiceFactory } from './toasty.service';

export let providers = [
  ToastyConfig,
  { provide: ToastyService, useFactory: ToastyServiceFactory, deps: [ToastyConfig] }
];

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent, ToastyComponent, SafeHtmlPipe],
  exports: [ToastComponent, ToastyComponent],
  providers
})
export class ToastyModule {
  static forRoot(): ModuleWithProviders<ToastyModule> {
    return {
      ngModule: ToastyModule,
      providers
    };
  }
}
