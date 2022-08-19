import {ButtonIconProps, icons} from "./ButtonIcon.props";
import styles from './ButtonIcon.module.css';
import cn from 'classnames';

// Дефолтное значение для стрелки
export const ButtonIcon = ({appearance, icon, className, ...props}: ButtonIconProps): JSX.Element => {
    const IconComp = icons[icon];

    return (
        // CN - classnames функция, позволяет передать условие и по условию применять стили. Если primary то будет стиль primary
        <button className={cn(styles.button, className, {
            [styles.primary]: appearance == "primary",
            [styles.white]: appearance == "white",
        })}
                {...props}
        >
            <IconComp />
        </button>
    );
};