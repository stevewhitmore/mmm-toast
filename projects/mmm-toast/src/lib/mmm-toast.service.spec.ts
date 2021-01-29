import { TestBed } from '@angular/core/testing';

import { MmmToastService } from './mmm-toast.service';

describe('MmmToastService', () => {
  let service: MmmToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmmToastService);
  });

  describe('receiveGlobalConfigs()', () => {
    it('should set the "globalConfigs" object to whatever GlobalConfigModel object is passed to it', () => {
      const expected = {
        limit: 3,
        theme: 'bootstrap',
        isCountdown: true,
      } as const;

      service.receiveGlobalConfigs(expected);

      expect(service.getGlobalConfigs()).toEqual(expected);
    });
  }); // receiveGlobalConfigs()

  describe('removeToast()', () => {
    it('should remove the specific toast by ID', () => {
      service.toasts = [
        {type: 'success', message: 'foo', id: 1},
        {type: 'success', message: 'bar', id: 2},
      ];

      service.removeToast(1);

      expect(service.toasts.length).toBe(1);
    });
  }); // removeToast()

  describe('clearAll()', () => {
    it('should remove all toasts', () => {
      service.toasts = [
        {type: 'success', message: 'foo', id: 1},
        {type: 'success', message: 'bar', id: 2},
      ];

      service.clearAll();

      expect(service.toasts.length).toBe(0);
    });
  }); // clearAll()

  describe('clearLast()', () => {
    it('should remove the last toast added to the toasts array', () => {
      service.toasts = [
        {type: 'success', message: 'foo', id: 1},
        {type: 'success', message: 'bar', id: 2},
      ];

      service.clearLast();

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].id).toBe(1);
    });
  }); // clearLast()

  describe('addToast()', () => {
    it('should add a toast with default toast props if nothing except minimum props are passed to it', () => {
      const toast = {type: 'success', message: 'foo'} as const;
      const expected = {
        id: 1,
        type: `toasta-type-${toast.type}`,
        message: toast.message,
        title: '',
        showClose: true,
        showDuration: true,
        theme: 'toasta-theme-default',
        timeout: 5000,
        position: 'toasta-position-bottom-right',
        limit: 5,
        isCountdown: false,
      } as const;

      service.addToast(toast);

      expect(service.toasts[0]).toEqual(expected);
    });

    it('should add a toast with global toast props if any are received', () => {
      const globalConfigs = {limit: 3, timeout: 9999};
      const toast = {type: 'success', message: 'foo'} as const;
      const expected = {
        id: 1,
        type: `toasta-type-${toast.type}`,
        message: toast.message,
        title: '',
        showClose: true,
        showDuration: true,
        theme: 'toasta-theme-default',
        timeout: globalConfigs.timeout,
        position: 'toasta-position-bottom-right',
        limit: globalConfigs.limit,
        isCountdown: false,
      } as const;

      service.receiveGlobalConfigs(globalConfigs);
      service.addToast(toast);

      expect(service.toasts[0]).toEqual(expected);
    });

    it('should overwrite whatever default or global toast props are passed to it', () => {
      const toast = {
        type: 'success',
        message: 'foo',
        title: 'Banana!',
        showClose: false,
        theme: 'material',
        position: 'top-left',
      } as const;
      const expected = {
        id: 1,
        type: `toasta-type-${toast.type}`,
        message: toast.message,
        title: toast.title,
        showClose: toast.showClose,
        showDuration: true,
        theme: `toasta-theme-${toast.theme}`,
        timeout: 5000,
        position: `toasta-position-${toast.position}`,
        limit: 5,
        isCountdown: false,
      } as const;

      service.addToast(toast);

      expect(service.toasts[0]).toEqual(expected);
    });
  }); // addToast()

});
