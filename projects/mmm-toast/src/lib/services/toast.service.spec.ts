import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ToastOptionsModel} from 'mmm-toast/mmm-toast';
import {take} from 'rxjs/operators';
import {ToastEventType} from '../state/toast-event-type.enum';
import {ToastEvent} from '../state/toast.event';

import {ToastConfigService} from './toast-config.service';
import {ToastService} from './toast.service';

const config = new ToastConfigService();

describe('Toast Service', () => {
  let toastService: ToastService;
  let toastOptions: ToastOptionsModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToastService,
        {provide: ToastConfigService, useValue: config},
      ]
    });

    toastService = TestBed.inject(ToastService);
    toastOptions = {
      title: 'Some title',
      msg: 'Some message...',
      showClose: true,
      showDuration: true,
      theme: 'default',
      timeout: 200,
    };
  });

  describe('default()', () => {
    it('should call add() with passed in options and \'default\'', () => {
      const spy = spyOn(toastService, 'add').and.callThrough();

      toastService.default(toastOptions);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(toastOptions, 'default');
    });
  }); // default()

  describe('info()', () => {
    it('should call add() with passed in options and \'info\'', () => {
      const spy = spyOn(toastService, 'add').and.callThrough();

      toastService.info(toastOptions);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(toastOptions, 'info');
    });
  }); // info()

  describe('success()', () => {
    it('should call add() with passed in options and \'success\'', () => {
      const spy = spyOn(toastService, 'add').and.callThrough();

      toastService.success(toastOptions);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(toastOptions, 'success');
    });
  }); // success()

  describe('wait()', () => {
    it('should call add() with passed in options and \'wait\'', () => {
      const spy = spyOn(toastService, 'add').and.callThrough();

      toastService.wait(toastOptions);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(toastOptions, 'wait');
    });
  }); // wait()

  describe('error()', () => {
    it('should call add() with passed in options and \'error\'', () => {
      const spy = spyOn(toastService, 'add').and.callThrough();

      toastService.error(toastOptions);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(toastOptions, 'error');
    });
  }); // error()

  describe('warning()', () => {
    it('should call add() with passed in options and \'warning\'', () => {
      const spy = spyOn(toastService, 'add').and.callThrough();

      toastService.warning(toastOptions);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(toastOptions, 'warning');
    });
  }); // warning()

  describe('add()', () => {
    it('should throw an error if no \'toastOptions\' is present', () => {
      expect(() => toastService.add(null, null)).toThrow(new Error('mmm-toast: No toast title or message specified!'));
    });

    it('should throw an error if no \'toastOptions\' does not have a title and does not have a message', () => {
      toastOptions.title = null;
      toastOptions.msg = null;

      expect(() => toastService.add(toastOptions, null)).toThrow(new Error('mmm-toast: No toast title or message specified!'));
    });

    it('should call checkConfigItem() twice', () => {
      const spy = spyOn(toastService, 'checkConfigItem');

      toastService.add(toastOptions, 'Success');

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should emit a ToastEventType.ADD object with the expected toast', () => {
      const spy = spyOn(toastService, 'emitEvent').and.callThrough();
      const expectedToast = {
        ...toastOptions,
        id: 1,
        onAdd: null,
        onRemove: null,
        type: 'toasta-type-default',
        theme: 'toasta-theme-default',
      };
      const expected = new ToastEvent(ToastEventType.ADD, expectedToast);

      toastService.add(toastOptions, 'default');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expected);
    });
  }); // add()

  describe('clearAll()', () => {
    it('should emit a new ToastEvent of type CLEAR_ALL', () => {
      const spy = spyOn(toastService, 'emitEvent').and.callThrough();
      const clearAllEvent = new ToastEvent(ToastEventType.CLEAR_ALL);

      toastService.clearAll();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(clearAllEvent);
    });
  }); // clearAll()

  describe('clear()', () => {
    it('should emit a new ToastEvent of type CLEAR_ALL', () => {
      const spy = spyOn(toastService, 'emitEvent').and.callThrough();
      const clearEvent = new ToastEvent(ToastEventType.CLEAR, 1);

      toastService.clear(1);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(clearEvent);
    });
  }); // clear()

  describe('checkConfigItem()', () => {
    it('should return false if \'options\' property is false', () => {
      toastOptions.showClose = false;

      const result = toastService.checkConfigItem(config, toastOptions, 'showClose');

      expect(result).toBe(false);
    });

    it('should return the value of the global config property if no local option is set', () => {
      toastOptions.showClose = null;
      config.showClose = true;

      const result = toastService.checkConfigItem(config, toastOptions, 'showClose');

      expect(result).toBe(true);
    });

    it('should return true if \'options\' property is true', () => {
      toastOptions.showClose = true;

      const result = toastService.checkConfigItem(config, toastOptions, 'showClose');

      expect(result).toBe(true);
    });
  }); // checkConfigItem()

  describe('emitEvent()', () => {
    it('should emit the passed in ToastEvent', fakeAsync(() => {
      const expectedEvent = new ToastEvent(ToastEventType.ADD);

      toastService.event$
      .pipe(take(1))
      .subscribe(data => {
        expect(data).toEqual(expectedEvent);
      });

      toastService.emitEvent(expectedEvent);
      tick();
    }));
  }); // emitEvent()
});
