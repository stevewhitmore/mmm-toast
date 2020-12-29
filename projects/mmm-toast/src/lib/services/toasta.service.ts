import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { isString, isNumber, isFunction } from '../toasta.utils';

import {ToastOptionsModel} from '../models/toast-options.model';
import {ToastaConfigService} from './toasta-config.service';
import {ToastDataModel} from '../models/toast-data.model';

import {ToastaEvent} from '../state/toasta.event';
import {ToastaEventType} from '../state/toasta-event-type.enum';

/**
 * Toasta service helps create different kinds of Toasts
 */
@Injectable({
  providedIn: 'root'
})
export class ToastaService {
  static THEMES: Array<string> = ['default', 'material', 'bootstrap'];
  uniqueCounter = 0;

  private eventSource: Subject<ToastaEvent> = new Subject<ToastaEvent>();
  public events: Observable<ToastaEvent> = this.eventSource.asObservable();

  constructor(private config: ToastaConfigService) {
  }
  /**
   * Create Toast of a default type
   */
  default(options: ToastOptionsModel | string | number): void {
    this.add(options, 'default');
  }

  /**
   * Create Toast of info type
   * @param options Individual toasta config overrides
   */
  info(options: ToastOptionsModel | string | number): void {
    this.add(options, 'info');
  }

  /**
   * Create Toast of success type
   * @param options Individual toasta config overrides
   */
  success(options: ToastOptionsModel | string | number): void {
    this.add(options, 'success');
  }

  /**
   * Create Toast of wait type
   * @param options Individual toasta config overrides
   */
  wait(options: ToastOptionsModel | string | number): void {
    this.add(options, 'wait');
  }

  /**
   * Create Toast of error type
   * @param options Individual toasta config overrides
   */
  error(options: ToastOptionsModel | string | number): void {
    this.add(options, 'error');
  }

  /**
   * Create Toast of warning type
   * @param options Individual toasta config overrides
   */
  warning(options: ToastOptionsModel | string | number): void {
    this.add(options, 'warning');
  }


  // Add a new toast item
  private add(options: ToastOptionsModel | string | number, type: string) {
    let toastaOptions: ToastOptionsModel;

    if (isString(options) && options !== '' || isNumber(options)) {
      toastaOptions = {
        title: options.toString()
      } as ToastOptionsModel;
    } else {
      toastaOptions = options as ToastOptionsModel;
    }

    if (!toastaOptions || !toastaOptions.title && !toastaOptions.msg) {
      throw new Error('mmm-toast: No toast title or message specified!');
    }

    type = type || 'default';

    // Set a unique counter for an id
    this.uniqueCounter++;

    // Set the local vs global config items
    const showClose = this._checkConfigItem(this.config, toastaOptions, 'showClose');

    // Set the local vs global config items
    const showDuration = this._checkConfigItem(this.config, toastaOptions, 'showDuration');

    // If we have a theme set, make sure it's a valid one
    let theme: string;
    if (toastaOptions.theme) {
      theme = ToastaService.THEMES.indexOf(toastaOptions.theme) > -1 ? toastaOptions.theme : this.config.theme;
    } else {
      theme = this.config.theme;
    }

    const toast: ToastDataModel = {
      id: this.uniqueCounter,
      title: toastaOptions.title,
      msg: toastaOptions.msg,
      showClose,
      showDuration,
      type: 'toasta-type-' + type,
      theme: 'toasta-theme-' + theme,
      onAdd: toastaOptions.onAdd && isFunction(toastaOptions.onAdd) ? toastaOptions.onAdd : null,
      onRemove: toastaOptions.onRemove && isFunction(toastaOptions.onRemove) ? toastaOptions.onRemove : null
    } as ToastDataModel;

    // If there's a timeout individually or globally, set the toast to timeout
    // Allows a caller to pass null/0 and override the default. Can also set the default to null/0 to turn off.
    toast.timeout = toastaOptions.hasOwnProperty('timeout') ? toastaOptions.timeout : this.config.timeout;

    // Push up a new toast item
    // this.toastsSubscriber.next(toast);
    // this.toastsEmitter.next(toast);
    this.emitEvent(new ToastaEvent(ToastaEventType.ADD, toast));
    // If we have a onAdd function, call it here
    if (toastaOptions.onAdd && isFunction(toastaOptions.onAdd)) {
      toastaOptions.onAdd.call(this, toast);
    }
  }

  // Clear all toasts
  clearAll() {
    // this.clearEmitter.next(null);
    this.emitEvent(new ToastaEvent(ToastaEventType.CLEAR_ALL));
  }

  // Clear the specific one
  clear(id: number) {
    // this.clearEmitter.next(id);
    this.emitEvent(new ToastaEvent(ToastaEventType.CLEAR, id));
  }

  // Checks whether the local option is set, if not,
  // checks the global config
  private _checkConfigItem(config: any, options: any, property: string) {
    if (options[property] === false) {
      return false;
    } else if (!options[property]) {
      return config[property];
    } else {
      return true;
    }
  }

  private emitEvent(event: ToastaEvent) {
    if (this.eventSource) {
      // Push up a new event
      this.eventSource.next(event);
    }
  }
}
