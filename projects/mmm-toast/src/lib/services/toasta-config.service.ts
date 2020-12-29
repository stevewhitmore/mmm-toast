import { Injectable } from '@angular/core';

/**
 * Default configuration for all toasts and toasta container
 */
@Injectable({
  providedIn: 'root'
})
export class ToastaConfigService {

  // Maximum number of toasties to show at once
  limit = 5;

  // Whether to show the 'X' icon to close the toast
  showClose = true;

  // Whether to show a progress bar at the bottom of the notification
  showDuration = true;

  // The window position where the toast pops up
  position: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'bottom-fullwidth' | 'top-right' | 'top-left' | 'top-center' | 'top-fullwidth' | 'center-center' = 'bottom-right';

  // How long (in miliseconds) the toasta shows before it's removed. Set to null/0 to turn off.
  timeout = 5000;

  // What theme to use
  theme: 'default' | 'material' | 'bootstrap' = 'default';
}
