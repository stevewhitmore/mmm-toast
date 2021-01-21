import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export interface GlobalConfigModel {
  id?: number;
  title?: string;
  showClose?: boolean;
  showDuration?: boolean;
  theme?: string;
  timeout?: number;
  position?: string;
  limit?: number;
  isCountdown?: boolean;
}

export interface ToastModel extends GlobalConfigModel {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MmmToastService {
  private positionSubject = new BehaviorSubject<string>('toasta-position-bottom-right');
  private toastPopSubject = new Subject<ToastModel[]>();
  private globalConfigs: any;
  private counter = 1;

  toasts: ToastModel[] = [];
  position$: Observable<string> = this.positionSubject.asObservable();
  toastPop$: Observable<ToastModel[]> = this.toastPopSubject.asObservable();

  receiveGlobalConfigs(configs: GlobalConfigModel) {
    this.globalConfigs = {...configs}
  }

  removeToast(toastId: number) {
    this.toasts = this.toasts.filter(t => t.id !== toastId);
    this.toastPopSubject.next(this.toasts);
  }

  clearAll() {
    this.toasts.length = 0;
    this.toastPopSubject.next(this.toasts);
  }

  clearLast() {
    this.toasts.pop();
    this.toastPopSubject.next(this.toasts);
  }

  addToast(toast: ToastModel) {
    const defaultToast = this.getDefaultToast();
    const globalToast = this.setGlobalValues(defaultToast);

    const finalToast: ToastModel = {
      type: `toasta-type-${toast.type}`,
      message: toast.message,
      title: toast.title || globalToast.title,
      showClose: toast.showClose || globalToast.showClose,
      showDuration: toast.showDuration || globalToast.showDuration,
      theme: toast.theme ? `toasta-theme-${toast.theme}` : globalToast.theme,
      timeout: toast.timeout || globalToast.timeout,
      position: toast.position ? `toasta-position-${toast.position}` : globalToast.position,
      limit: toast.limit || globalToast.limit,
      isCountdown: toast.isCountdown || globalToast.isCountdown,
    };

    if (toast.showClose === false) {
      finalToast.showClose = false;
    }

    if (toast.showDuration === false) {
      finalToast.showDuration = false;
    }

    this.setPosition(finalToast);
    this.serveToast(finalToast);
  }

  // Airbnb says to avoid 'set' and 'get' syntax. I happen to agree with them.
  // See https://github.com/airbnb/javascript#accessors and https://github.com/airbnb/javascript/issues/1880
  getGlobalConfigs() {
    return this.globalConfigs;
  }

  getToasts() {
    return this.toasts;
  }

  private getDefaultToast() {
    const defaultToast: GlobalConfigModel = {
      title: '',
      showClose: true,
      showDuration: true,
      theme: 'toasta-theme-default',
      timeout: 5000,
      position: 'toasta-position-bottom-right',
      limit: 5,
      isCountdown: false,
    };

    return defaultToast;
  }

  private setGlobalValues(toast: GlobalConfigModel) {
    if (this.globalConfigs) {
      for (const [key, value] of Object.entries(this.globalConfigs)) {
        toast = {
          ...toast,
          [key]: value,
        };
      }

      if (this.globalConfigs.theme) {
        toast.theme = `toasta-theme-${this.globalConfigs.theme}`;
      }

      if (this.globalConfigs.position) {
        toast.position = `toasta-position-${this.globalConfigs.position}`;
      }

      if (this.globalConfigs.showClose === false) {
        toast.showClose = false;
      }

      if (this.globalConfigs.showDuration === false) {
        toast.showDuration = false;
      }
    }
    
    return toast;
  }

  private setPosition(toast: ToastModel) {
    const position = toast.position || 'toasta-position-bottom-right';

    this.positionSubject.next(position);
  }

  private serveToast(toast: any) {
    const latestToast = {
      ...toast,
      id: this.counter++,
    };

    if (this.toasts.length >= toast.limit) {
      this.toasts.shift();
    }
    this.toasts.push(latestToast);

    this.toastPopSubject.next(this.toasts);
  }
}
