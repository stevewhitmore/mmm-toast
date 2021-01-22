import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { MmmToastModalComponent } from './mmm-toast-modal.component';


describe('MmmToastComponentModal', () => {
  let component: MmmToastModalComponent;
  let fixture: ComponentFixture<MmmToastModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MmmToastModalComponent ]
    });

    fixture = TestBed.createComponent(MmmToastModalComponent);
    component = fixture.componentInstance;
    component.toast = {
      id: 1,
      type: 'success',
      message: 'foo',
      theme: 'toasta-theme-default',
      showDuration: true,
    };
    fixture.detectChanges();
  });

  afterEach(fakeAsync(() => {
    flush();
  }));

  describe('handleProgress()', () => {
    it('should set "timeout" prop to toast timeout value', () => {
      component.toast.timeout = 3000;

      component.handleProgress();

      expect(component.timeout).toBe(3000);
    });

    it('should set "timeout" prop to 5000 if none is provided by the toast object', () => {
      expect(component.timeout).toBe(5000);
    });

    it('should adjust the "title", "type", and "message" if the toast is a countdown', fakeAsync(() => {
      component.toast.isCountdown = true;

      component.handleProgress();
      tick(1000); // defaults to 5000 so the props should exist in this window

      expect(component.toast.title).toContain('Seconds remaining:');
      expect(component.toast.type).toBe('toasta-type-wait');
      expect(component.toast.message).toBe('');
    }));

    it('should call "close" after allotted timeout time', fakeAsync(() => {
      const spy = spyOn(component, 'close').and.callThrough();
      component.toast.timeout = 3000;

      component.handleProgress();
      tick(3000);

      expect(spy).toHaveBeenCalledOnceWith(component.toast);
    }));
  }); // handleProgress()

  describe('close()', () => {
    it('should call next() on "closeToastEvent"', () => {
      const spy = spyOn(component.closeToastEvent, 'next').and.callThrough();

      component.close(component.toast);

      expect(spy).toHaveBeenCalledOnceWith(component.toast.id);
    });
  }); // close()

});
