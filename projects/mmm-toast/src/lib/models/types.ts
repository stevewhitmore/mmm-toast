import { ToastModel } from '.';

type Prefixable = keyof Pick<ToastModel, 'theme' | 'position' | 'type'>;
export type ToastAPrefix<Key extends Prefixable> = `toasta-${Key}`;

export type Theme = 'bootstrap' | 'default' | 'material';
export type GlobalTheme = `${ToastAPrefix<'theme'>}-${Theme}` | Theme;

export type PositionY = 'bottom' | 'top';
export type PositionX = 'right' | 'left' | 'center' | 'fullwidth';
export type Position = `${PositionY}-${PositionX}` | 'center-center';
export type GlobalPosition = `${ToastAPrefix<'position'>}-${Position}` | Position;

export type Type = 'error' | 'info' | 'success' | 'wait' | 'warning';
export type GlobalType = `${ToastAPrefix<'type'>}-${Type}` | Type;
