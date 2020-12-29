import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ToastServiceStub {
  static THEMES: Array<string> = ['default', 'material', 'bootstrap'];
  uniqueCounter = 0;

  private eventSource: Subject<any> = new Subject<any>();
  public events: Observable<any> = this.eventSource.asObservable();

  public emitEvent(event: any) {
    if (this.eventSource) {
      // Push up a new event
      this.eventSource.next(event);
    }
  }
}
