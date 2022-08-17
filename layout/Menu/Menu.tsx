import {useContext} from "react";
import {AppContext} from "../../context/app-context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import styles from './Menu.module.css';
import cn from "classnames";
import Link from 'next/link';
import {useRouter} from "next/router";
import {firstLevelMenu} from "../../helpers/helpers";

export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext);
    const router = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened;
            }
            return m;
        }))
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
                    <div key={m._id.secondCategory}>
                        <div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                        <div className={cn(styles.secondLevelBlock, {
                            [styles.secondLevelBlockOpened]: m.isOpened
                        })}>
                            {buildThirdLevel(m.pages, menuItem.route)}
                        </div>
                    </div>
                );
            })}
        </div>
    }
    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return <div>
            {pages.map(p => (
                <Link href={`/${route}/${p.alias}`} key={p._id}>
                    <a key={p.category} className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                    })}>{p.category}</a>
                </Link>
            ))}
        </div>;
    }

    return <div className={styles.menu}>
        {buildFirstLevel()}
    </div>;
};