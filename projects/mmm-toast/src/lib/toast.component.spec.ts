import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from './shared';

import { ToastComponent } from './toast.component';

const toastMockData = require('./testing/toast.json');

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let event;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToastComponent,
        SafeHtmlPipe
      ]
    });

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    component.toast = toastMockData;

    event = {
      preventDefault: function() {}
    }

    fixture.detectChanges();
  });

  // describe('handleProgress()', () => {
    // this should be handled with e2e tests
  // }); // handleProgress()

  describe('close()', () => {
    it('should call closeToastEvent.next', () => {
      const spy = spyOn(component.closeToastEvent, 'next').and.callThrough();

      component.close(event);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(component.toast);
    });
  }); // close()
});
