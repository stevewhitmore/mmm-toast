import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastService } from './services/toast.service';
import { ToastConfigService } from './services/toast-config.service';
import { ToastServiceStub } from './testing/toasta-service.stub';
import { ToastEventType } from './state/toast-event-type.enum';
import { ToastDataModel } from './models/toast-data.model';

const toastServiceStub = new ToastServiceStub();

fdescribe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toast: ToastDataModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        {provide: ToastService, useValue: toastServiceStub},
        ToastConfigService]
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
      const clearEvent = { type: ToastEventType.CLEAR, value: 1 };

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
});
