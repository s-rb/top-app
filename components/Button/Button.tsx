import {ButtonProps} from "./Button.props";
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';
import cn from 'classnames';
import {motion} from "framer-motion";

// Дефолтное значение для стрелки
export const Button = ({appearance, arrow = 'none', children, className, ...props}: ButtonProps): JSX.Element => {
    return (
        // Как вариант вместо Omit в buttonprops можно было бы спрэдить не все пропсы, а выделить 5 конфликтующих отдельно, а остальные спрэдить
        // CN - classnames функция, позволяет передать условие и по условию применять стили. Если primary то будет стиль primary
        <motion.button
            whileHover={{scale: 1.05}}
            className={cn(styles.button, className, {
                [styles.primary]: appearance == "primary",
                [styles.ghost]: appearance == "ghost",
            })}
            {...props}
        >
            {children}
            {arrow !== 'none' && <span className={cn(styles.arrow, {
                [styles.down]: arrow == 'down'
            })}>
                <ArrowIcon/>
                {/*<img src="/arrow.svg"/>*/}
            </span>}
        </motion.button>
    );
};