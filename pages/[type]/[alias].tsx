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
import {TopPageComponent} from "../../page-components";
import {API} from "../../helpers/api";
import Head from "next/head";
import {Error404} from "../404";

function TopPage({firstCategory, page, products}: TopPageProps): JSX.Element {
    if (!page || !products) {
        return <Error404/>;
    }

    return <>
        <Head>
            <title>{page.metaTitle}</title>
            <meta name='description' content={page.metaDescription}/>
            <meta property='og:title' content={page.metaTitle}/>
            <meta property='og:description' content={page.metaDescription}/>
            <meta property='og:type' content="article"/>
        </Head>
        <TopPageComponent firstCategory={firstCategory} page={page} products={products}/>
    </>;
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of firstLevelMenu) {
        const {data: menu} = await axios.post<MenuItem[]>(
            API.topPage.find,
            {firstCategory: m.id});
        paths = paths.concat(menu.flatMap(o => o.pages.map(p => `/${m.route}/${p.alias}`)));
    }
    return {
        paths,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({params}/*: GetStaticPropsContext<ParsedUrlQuery>*/) => {
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
            API.topPage.find,
            {firstCategory: firstCategoryItem.id});
        if (menu.length == 0) {
            return {notFound: true};
        }
        const {data: page} = await axios.get<TopPageModel>(
            API.topPage.byAlias + params.alias, // алиас - потому что название страницы дали [alias]
        );
        const {data: products} = await axios.post<ProductModel[]>(API.product.find,
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
        return {notFound: true};
    }
};

interface TopPageProps extends Record<string, unknown> { // extend для использованию в withLayout
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}