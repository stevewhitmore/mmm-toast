import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {ToastComponent} from './toast.component';
import {ToastService} from './services/toast.service';
import {ToastConfigService} from './services/toast-config.service';
import {ToastServiceStub} from './testing/toasta-service.stub';
import {ToastEventType} from './state/toast-event-type.enum';
import {ToastDataModel} from './models/toast-data.model';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

const toastServiceStub = new ToastServiceStub();

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toast: ToastDataModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        {provide: ToastService, useValue: toastServiceStub},
        ToastConfigService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toast = require('./testing/toast.json');

    fixture.detectChanges();
  });

  describe('listenForToastEvent()', () => {
    it('should call "add()" with event value if event type is ADD', fakeAsync(() => {
      const spy = spyOn(component, 'add').and.callThrough();
      const addEvent = { type: ToastEventType.ADD, value: toast };

      toastServiceStub.emitEvent(addEvent);
      tick();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(addEvent.value);

      flush();
    }));

    it('should call "clear()" with event value if event type is CLEAR', fakeAsync(() => {
      const spy = spyOn(component, 'clear').and.callThrough();
      const clearEvent = { type: ToastEventType.CLEAR, value: toast.id };

      toastServiceStub.emitEvent(clearEvent);
      tick();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(clearEvent.value);

      flush();
    }));

    it('should call "clearAll()" with event value if event type is CLEAR_ALL', fakeAsync(() => {
      const spy = spyOn(component, 'clearAll').and.callThrough();
      const clearAllEvent = { type: ToastEventType.CLEAR_ALL };

      toastServiceStub.emitEvent(clearAllEvent);
      tick();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith();

      flush();
    }));
  }); // listenForToastEvent()

  describe('closeToast()', () => {
    it('should call clear() with ToastDataModel.id', () => {
      const spy = spyOn(component, 'clear').and.callThrough();

      component.closeToast(toast);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(toast.id);
    });
  }); // closeToast()

  describe('add()', () => {
    it('should keep it to 5 toasts open at a time (assuming default doesn\'t change) by removing toasts FIFO', () => {
      const toasts = [];
      for (let x = 0; x < 4; x++) {
        const t = {
          ...toast,
          id: 99-x,
          title: 'foo'
        };
        toasts.push(t);
      }
      component.toasts = [...toasts];

      component.add(toast);

      expect(component.toasts.length).toBe(5);
      expect(component.toasts[4].id).toBe(1);
    });

    it('should call closeAfterTimeout()', () => {
      const spy = spyOn(component, 'closeAfterTimeout').and.callThrough();

      component.add(toast);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(toast);
    });
  }); // add()

  describe('clear()', () => {
    it('should remove the toast by id', () => {
      const toasts = [];
      for (let x = 0; x < 4; x++) {
        const t = {
          ...toast,
          id: x+1,
          title: 'foo'
        };
        toasts.push(t);
      }
      component.toasts = [...toasts];

      component.clear(1);

      expect(component.toasts.length).toBe(3);
      expect(component.toasts.some(t => t.id === 1)).toBe(false);
    });

    it('should throw an error if no id is present', () => {
      expect(() => component.clear(null)).toThrow(new Error('Please provide id of Toast to close'));
    });
  }); // clear()

  describe('clearAll()', () => {
    it('should make "toasts" an empty array', () => {
      const toasts = [];
      for (let x = 0; x < 4; x++) {
        const t = {
          ...toast,
          id: x+1,
          title: 'foo'
        };
        toasts.push(t);
      }
      component.toasts = [...toasts];

      component.clearAll();

      expect(component.toasts.length).toBe(0);
    });
  }); // clearAll()

  describe('closeAfterTimeout()', () =>  {
    it('should NOT call clear() before allotted timeout', fakeAsync(() => {
      const spy = spyOn(component, 'clear').and.callThrough();
      const testToast = {
        ...toast,
        id: 99,
        timeout: 3000
      };

      component.closeAfterTimeout(testToast);
      tick(1000);

      expect(spy).toHaveBeenCalledTimes(0);

      flush();
    }));

    it('should call clear() after allotted timeout', fakeAsync(() => {
      const spy = spyOn(component, 'clear').and.callThrough();
      const testToast = {
        ...toast,
        id: 99,
        timeout: 3000
      };

      component.closeAfterTimeout(testToast);
      tick(3500);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(testToast.id);

      flush();
    }));
  }); // closeAfterTimeout()
});
