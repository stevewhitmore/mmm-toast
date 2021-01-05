/**
 * Options to configure a new Toast
 */
export class ToastOptionsModel {
  title: string;
  msg?: string;
  showClose?: boolean;
  showDuration?: boolean;
  theme?: string;
  timeout?: number;
  onAdd?: Function;
  onRemove?: Function;
}
