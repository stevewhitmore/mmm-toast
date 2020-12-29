import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastaComponent } from './toasta.component';
import { ToastaService } from './services/toasta.service';
import { ToastaConfigService } from './services/toasta-config.service';

fdescribe('ToastaComponent', () => {
  let component: ToastaComponent;
  let fixture: ComponentFixture<ToastaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastaComponent],
      providers: [ToastaConfigService, ToastaService]
    });
    fixture = TestBed.createComponent(ToastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('listenForToastEvent()', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  }); // listenForToastEvent()
});
