import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

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
  position$ = this.positionSubject.asObservable();
  toastPop$ = this.toastPopSubject.asObservable();

  globalConfigs: any;

  counter = 1;
  toasts: ToastModel[] = [];

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
    const initialToast: ToastModel = {
      type: `toasta-type-${toast.type}`,
      message: toast.message,
      title: toast.title,
      showClose: toast.showClose,
      showDuration: toast.showDuration,
      theme: toast.theme,
      timeout: toast.timeout,
      position: toast.position,
      limit: toast.limit,
      isCountdown: toast.isCountdown,
    };

    const globalizedToast = this.setGlobalValues(initialToast);
    const fullyConfiguredToast = this.setDefaultValues(globalizedToast);

    this.serveToast(fullyConfiguredToast);
  }

  private setGlobalValues(toast: ToastModel) {
    if (this.globalConfigs) {
      toast = {
        ...this.globalConfigs,
        ...toast,
      };

      if (toast.theme) {
        toast.theme = `toasta-theme-${toast.theme}`;
      }

      this.setPosition(toast);
    }

    return toast;
  }

  private setPosition(toast: ToastModel) {
    const position = toast.position ? `toasta-position-${toast.position}` : `toasta-position-bottom-right`;

    this.positionSubject.next(position);
  }

  private setDefaultValues(toast: ToastModel) {
    toast.theme = toast.theme || 'toasta-theme-default';
    toast.timeout = toast.timeout || 5000;
    toast.limit = toast.limit || 5;

    if (toast.showClose !== false) {
      toast.showClose = true;
    }

    if (toast.showDuration !== false) {
      toast.showDuration = true;
    }

    return toast;
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
