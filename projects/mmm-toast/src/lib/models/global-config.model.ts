import { GlobalTheme, GlobalPosition } from '.';

export interface GlobalConfigModel {
  id?: number;
  title?: string;
  showClose?: boolean;
  showDuration?: boolean;
  theme?: GlobalTheme;
  timeout?: number;
  position?: GlobalPosition;
  limit?: number;
  isCountdown?: boolean;
}
