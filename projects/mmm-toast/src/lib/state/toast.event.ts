import {ToastEventType} from './toast-event-type.enum';

export class ToastEvent {
  constructor(public type: ToastEventType, public value?: any) { }
}
