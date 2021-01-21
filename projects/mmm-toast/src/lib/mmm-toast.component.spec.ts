import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmmToastComponent } from './mmm-toast.component';
import { MmmToastService } from './mmm-toast.service';

class MockMmmToastService {
  removeToast(id: number) {}
}

const mockMmmToastService = new MockMmmToastService();

describe('MmmToastComponent', () => {
  let component: MmmToastComponent;
  let fixture: ComponentFixture<MmmToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MmmToastComponent ],
      providers: [
        {provide: MmmToastService, useValue: mockMmmToastService}
      ],
    });

    fixture = TestBed.createComponent(MmmToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // There's no point in testing listenForToastEvent() because all it does is capture the value of 
  // Observables that are created elsewhere. 

  describe('clearToast()', () => {
    it('should pass an Observable of a list of ToastModel objects', () => {
      const spy = spyOn(mockMmmToastService, 'removeToast').and.callThrough();
      const mockId = 5;

      component.clearToast(mockId);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(mockId);
    });
  }); // clearToast()
});
