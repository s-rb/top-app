/* Данный файл нужен чтобы переходить в странички корневых категорий */


import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from "axios";
import {firstLevelMenu} from "../../helpers/helpers";
import {ParsedUrlQuery} from "querystring";
import {withLayout} from "../../layout/Layout";
import {MenuItem} from "../../interfaces/menu.interface";
import {API} from "../../helpers/api";

function Type({ firstCategory }: TypeProps): JSX.Element {
    return (
        <>
            Type: {firstCategory}
        </>
    );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(m => '/' + m.route),
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return { notFound: true };
    }
    const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
    if (!firstCategoryItem) {
        return { notFound: true };
    }
    const {data: menu} = await axios.post<MenuItem[]>(
        API.topPage.find,
        {firstCategory: firstCategoryItem.id});
    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id
        }
    }
}

interface TypeProps extends Record<string, unknown> { // extend для использованию в withLayout
    menu: MenuItem[];
    firstCategory: number;
}