import { GlobalConfigModel, GlobalType } from '.';

export interface ToastModel extends GlobalConfigModel {
  type: GlobalType;
  message: string;
}
