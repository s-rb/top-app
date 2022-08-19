import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";
import up from './Up2.svg';
import close from './close.svg';
import menu from './Menu.svg';

export const icons = {
    up, close, menu
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    icon: IconName;
    appearance: 'primary' | 'white';
}