import {TagProps} from "./Tag.props";
import styles from './Tag.module.css';
import cn from 'classnames';

export const Tag = ({size = 'medium', children, color = 'ghost', href, className, ...props}: TagProps): JSX.Element => {
    return (
        <div className={cn(styles.tag, className, {
            [styles['medium']]: size == 'medium',
            [styles['large']]: size == 'large',
            [styles['ghost']]: color == 'ghost',
            [styles['primary']]: color == 'primary',
            [styles['green']]: color == 'green',
            [styles['grey']]: color == 'grey',
            [styles['red']]: color == 'red',
        })}{...props}>
            {href ? <a href={href}>{children}</a> : <>{children}</>}
        </div>
    )
}
;