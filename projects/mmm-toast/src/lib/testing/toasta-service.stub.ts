import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ToastEvent} from '../state/toast.event';

@Injectable()
export class ToastServiceStub {
  static THEMES: Array<string> = ['default', 'material', 'bootstrap'];
  uniqueCounter = 0;

  private eventSource: Subject<any> = new Subject<any>();
  public event$: Observable<any> = this.eventSource.asObservable();

  emitEvent(event: ToastEvent) {
    this.eventSource.next(event);
  }
}
