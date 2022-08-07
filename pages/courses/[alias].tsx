/*
В кадратных скобках указывает что тут будет динамический роут. Страницы (URLы) лежат согласно структуре
То есть структура папок соответствует структуре страниц URL на сайте */

import {withLayout} from "../../layout/Layout";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import React from "react";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {TopPageModel} from "../../interfaces/page.interface";
import {ProductModel} from "../../interfaces/product.interface";

const firstCategory = 0;

function Course({menu, page, products}: CourseProps): JSX.Element {
    return (
        <>
            {products && products.length}
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    const {data: menu} = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
        {firstCategory});
    return {
        paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)),
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({params}/*: GetStaticPropsContext<ParsedUrlQuery>*/) => {
    if (!params) {
        return {notFound: true};
    }
     /*const firstCategory = 0; // Категория для сайдабр меню - всегда такая*/
    const {data: menu} = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
        {firstCategory});
    const {data: page} = await axios.get<TopPageModel>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias, // алиас - потому что название страницы дали [alias]
    );
    const {data: products} = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
        {category: page.category, limit: 10});
    return {
        props: {
            menu,
            firstCategory,
            page,
            products
        }
    };
};

interface CourseProps extends Record<string, unknown> { // extend для использованию в withLayout
    menu: MenuItem[];
    firstCategory: number;
    page: TopPageModel;
    products: ProductModel[];
}