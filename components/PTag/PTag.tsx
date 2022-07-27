import {PtagProps} from "./PTag.props";
import styles from './PTag.module.css';
import cn from 'classnames';

export const Ptag = ({size = 'medium', children, className, ...props}: PtagProps): JSX.Element => {
    return (
        <p className={cn(styles.p, className, {
            [styles['p-small']]: size == 'small',
            [styles['p-medium']]: size == 'medium',
            [styles['p-large']]: size == 'large',
        })}{...props}>
            {children}
        </p>
    )
};