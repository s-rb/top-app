import {FirstLevelMenuItem} from "../interfaces/menu.interface";
import CoursesIcon from "./icons/courses.svg";
import {TopLevelCategory} from "../interfaces/page.interface";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";

export const firstLevelMenu: FirstLevelMenuItem[] = [
    {route: 'courses', name: 'Курсы', icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
    {route: 'services', name: 'Сервисы', icon: <ServicesIcon/>, id: TopLevelCategory.Services},
    {route: 'books', name: 'Книги', icon: <BooksIcon/>, id: TopLevelCategory.Books},
    {route: 'products', name: 'Продукты', icon: <ProductsIcon/>, id: TopLevelCategory.Products},
];

// С помощью этого regexp находим все пробелы между каждыми тремя цифрами, так чтобы в конце не остались цифры. g - глобально, заменяем на пробелы
export const priceRu = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');

// Функция позволяет склонять (например - 1 отзыв, 2-4 отзыва, 5 - 20 отзывов. Варианты написания передаются при вызове
export const declOfNum = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
        ];
}