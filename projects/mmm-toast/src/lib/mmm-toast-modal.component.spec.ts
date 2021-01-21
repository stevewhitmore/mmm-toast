import { ComponentFixture, TestBed } from "@angular/core/testing";

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
      type: 'success', 
      message: 'foo',
      theme: 'toasta-theme-default',
    };
    fixture.detectChanges();
  });

  it('should something', () => {
    expect(true).toBe(true);
  })
});