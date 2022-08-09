import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";

function Search({menu, firstCategory}: HomeProps): JSX.Element {
    return (
        <>
        </>
    );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0; // Категория для сайдабр меню - всегда такая
    const {data: menu} = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
        {firstCategory});
    return {
        props: {
            menu,
            firstCategory
        }
    }
}

interface HomeProps extends Record<string, unknown> { // extend для использованию в withLayout
    menu: MenuItem[];
    firstCategory: number;
}