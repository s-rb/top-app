import styles from './Up.module.css';
import UpIcon from '../ButtonIcon/Up2.svg';
import {useScrollY} from "../../hooks/useScrollY";
import {motion, useAnimation} from "framer-motion";
import {useEffect} from "react";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon";

export const Up = (): JSX.Element => {
    const controls = useAnimation();
    // Наш хук вычисляет Y где мы находимся сейчас
    const y = useScrollY();

    useEffect(() => {
        controls.start({opacity: y / document.body.scrollHeight})
    }, [y, controls])

    const scrollToTop = () => {
        // window будет полюбому, т.к. только по клику в браузере открывается
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (<motion.div
            className={styles.up}
            animate={controls}
            initial={{opacity: 0}}
        >
            <ButtonIcon icon='up' appearance='primary' onClick={scrollToTop}/>
        </motion.div>
    )
}