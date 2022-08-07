import {useContext} from "react";
import {AppContext} from "../../context/app-context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import {TopLevelCategory} from "../../interfaces/page.interface";
import styles from './Menu.module.css';
import cn from "classnames";

const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'courses', name: 'Курсы', icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
    { route: 'services', name: 'Сервисы', icon: <ServicesIcon/>, id: TopLevelCategory.Services},
    { route: 'books', name: 'Книги', icon: <BooksIcon/>, id: TopLevelCategory.Books},
    { route: 'products', name: 'Продукты', icon: <ProductsIcon/>, id: TopLevelCategory.Products},
];

export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext);

    const buildFirstLevel = () => {
        return <>
            {firstLevelMenu.map(menuItem => (
                <div key={menuItem.route}>
                    <a href={`/${menuItem.route}`}>
                        <div className={cn(styles.firstLevel, {
                            [styles.firstLevelActive]: menuItem.id == firstCategory     /*Элемент меню будет активным - для текущего элемента меню*/
                        })}>
                            {menuItem.icon}
                            <span>{menuItem.name}</span>
                        </div>
                    </a>
                    {menuItem.id == firstCategory && buildSecondLevel(menuItem)}
                </div>
            ))}
        </>
    }

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return <div className={styles.secondBlock}>
            {menu.map(m => (
                <div key={m._id.secondCategory}>
                    <div className={styles.secondLevel}>{m._id.secondCategory}</div>
                    <div className={cn(styles.secondLevelBlock, {
                        [styles.secondLevelBlockOpened]: m.isOpened
                    })}>
                        {buildThirdLevel(m.pages, menuItem.route)}
                    </div>
                </div>
            ))}
        </div>
    }
    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return <div>
            {pages.map(p => (
                <a key={p.category } href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: false
                })}>{p.category}</a>
            ))}
        </div>;
    }

    return <div className={styles.menu}>
        {buildFirstLevel()}
    </div>;
};