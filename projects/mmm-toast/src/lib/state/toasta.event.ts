import {ToastaEventType} from './toasta-event-type.enum';

export class ToastaEvent {
  constructor(public type: ToastaEventType, public value?: any) { }
}
