import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmmToastComponent } from './mmm-toast.component';

describe('MmmToastComponent', () => {
  let component: MmmToastComponent;
  let fixture: ComponentFixture<MmmToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmmToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MmmToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
