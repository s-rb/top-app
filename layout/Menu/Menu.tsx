import {useContext, KeyboardEvent} from "react";
import {AppContext} from "../../context/app-context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import styles from './Menu.module.css';
import cn from "classnames";
import Link from 'next/link';
import {useRouter} from "next/router";
import {firstLevelMenu} from "../../helpers/helpers";
import {motion} from "framer-motion";

export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext);
    const router = useRouter();
    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom: 0
        }
    };
    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 29
        },
        hidden: {
            height: 0,
            opacity: 0
        }
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened;
            }
            return m;
        }))
    }

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault(); // Чтобы не скроллится к концу
            openSecondLevel(secondCategory);
        }
    }

    const buildFirstLevel = () => {
        return <>
            {firstLevelMenu.map(menuItem => (
                <div key={menuItem.route}>
                    <Link href={`/${menuItem.route}`}>
                        <a>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: menuItem.id == firstCategory     /*Элемент меню будет активным - для текущего элемента меню*/
                            })}>
                                {menuItem.icon}
                                <span>{menuItem.name}</span>
                            </div>
                        </a>
                    </Link>
                    {menuItem.id == firstCategory && buildSecondLevel(menuItem)}
                </div>
            ))}
        </>
    }

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return <div className={styles.secondBlock}>
            {menu.map(m => {
                if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                    m.isOpened = true;
                }
                return (
                    // tabindex=0 - значит элемент идет по порядку и можно табаться, -1 - значит по нему нельзя табаться с клавиатуры
                    // индекс больше нуля значит что он будет показываться раньше индекса 0
                    <div key={m._id.secondCategory}>
                        <div
                            tabIndex={0}
                            onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
                            className={styles.secondLevel}
                            onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                        <motion.div
                            layout
                            variants={variants}
                            initial={m.isOpened ? 'visible' : 'hidden'}
                            animate={m.isOpened ? 'visible' : 'hidden'}
                            className={cn(styles.secondLevelBlock)}
                        >
                            {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                        </motion.div>
                    </div>
                );
            })}
        </div>
    }
    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return <div>
            {pages.map(p => (
                <motion.div key={p._id} variants={variantsChildren}>
                    <Link href={`/${route}/${p.alias}`}>
                        <a tabIndex={isOpened ? 0 : -1} key={p.category} className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                        })}>{p.category}</a>
                    </Link>
                </motion.div>
            ))}
        </div>;
    }

    return <nav className={styles.menu} role="navigation">
        {buildFirstLevel()}
    </nav>;
};