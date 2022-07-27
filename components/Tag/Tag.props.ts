import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    size?: 'medium' | 'large';
    children: ReactNode;
    color?: 'ghost' | 'red' | 'green' | 'grey' | 'primary';
    href?: string;
}