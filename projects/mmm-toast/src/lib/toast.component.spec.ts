import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastService } from './services/toast.service';
import { ToastConfigService } from './services/toast-config.service';

fdescribe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [ToastConfigService, ToastService]
    });
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('listenForToastEvent()', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  }); // listenForToastEvent()
});
