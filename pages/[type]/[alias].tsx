/*
В кадратных скобках указывает что тут будет динамический роут. Страницы (URLы) лежат согласно структуре
То есть структура папок соответствует структуре страниц URL на сайте */

import {withLayout} from "../../layout/Layout";
import {GetStaticPaths, GetStaticProps} from "next";
import React from "react";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {TopLevelCategory, TopPageModel} from "../../interfaces/page.interface";
import {ProductModel} from "../../interfaces/product.interface";
import {firstLevelMenu} from "../../helpers/helpers";

function Course({menu, page, products}: CourseProps): JSX.Element {
    return (
        <>
            {products && products.length}
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of firstLevelMenu) {
        const {data: menu} = await axios.post<MenuItem[]>(
            process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
            {firstCategory: m.id});
        paths = paths.concat(menu.flatMap(o => o.pages.map(p => `/${m.route}/${p.alias}`)));
    }
    return {
        paths,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({params}/*: GetStaticPropsContext<ParsedUrlQuery>*/) => {
    if (!params) {
        return {notFound: true};
    }
    const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
    if (!firstCategoryItem) {
        return {notFound: true};
    }
    try {
        /*const firstCategory = 0; // Категория для сайдабр меню - всегда такая*/
        const {data: menu} = await axios.post<MenuItem[]>(
            process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
            {firstCategory: firstCategoryItem.id});
        if (menu.length == 0) {
            return { notFound: true };
        }
        const {data: page} = await axios.get<TopPageModel>(
            process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias, // алиас - потому что название страницы дали [alias]
        );
        const {data: products} = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
            {category: page.category, limit: 10});
        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products
            }
        };
    } catch (e) {
        return { notFound: true };
    }
};

interface CourseProps extends Record<string, unknown> { // extend для использованию в withLayout
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}