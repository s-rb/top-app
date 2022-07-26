import {ButtonProps} from "./Button.props";
import styles from './Button.module.css';
import cn from 'classnames';

export const Button = ({appearance, children}: ButtonProps): JSX.Element => {
    return (
        // CN - classnames функция, позволяет передать условие и по условию применять стили. Если primary то будет стиль primary
        <button className={cn(styles.button, {
            [styles.primary]: appearance == "primary",
            [styles.ghost]: appearance == "ghost",
        })}
        >
            {children}
        </button>
    );
};