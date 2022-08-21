import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";

// Omit позволяет исключить конфликтующие в данном случае поля
export interface ButtonProps extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
    children: ReactNode;
    appearance: 'primary' | 'ghost';
    arrow?: 'right' | 'down' | 'none';
}