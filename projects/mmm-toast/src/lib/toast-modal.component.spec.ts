import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastModalComponent } from './toast-modal.component';

const toastMockData = require('./testing/toast.json');

describe('ToastModalComponent', () => {
  let component: ToastModalComponent;
  let fixture: ComponentFixture<ToastModalComponent>;
  let event;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToastModalComponent
      ]
    });

    fixture = TestBed.createComponent(ToastModalComponent);
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
