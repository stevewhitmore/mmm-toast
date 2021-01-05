/**
 * Structrure of a created Toast
 */
export class ToastDataModel {
  id: number;
  title: string;
  msg: string;
  showClose: boolean;
  showDuration: boolean;
  type: string;
  theme: string;
  timeout: number;
  onAdd: Function;
  onRemove: Function;
  onClick: Function;
}
