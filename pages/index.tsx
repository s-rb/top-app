import {Button, Htag, Input, Ptag, Rating, Tag, TextArea} from "../components";
import {useState} from "react";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";
import {API} from "../helpers/api";
import Error from "next/error";

function Home({menu, firstCategory}: HomeProps): JSX.Element {

    const [rating, setRating] = useState<number>(4);

    return (
        <>
            <Htag tag='h1'>Text</Htag>
            <Htag tag='h2'>Text</Htag>
            <Htag tag='h3'>Text</Htag>
            <Button appearance="primary" arrow='right'>Кнопка</Button>
            <Button appearance="ghost" arrow='down'>Кнопка</Button>
            <Ptag size='small'>Это маленький параграф</Ptag>
            <Ptag>Это средний параграф</Ptag>
            <Ptag size='large'>Это большой параграф</Ptag>

            <Tag size='medium'>Default medium</Tag>
            <Tag size='large' color='red'>Red large</Tag>
            <Tag color='grey' size='medium'>Grey medium</Tag>
            <Tag size='large' color='green'>Green large</Tag>
            <Tag color='primary'>Primary default</Tag>
            <Tag color='ghost' size='large'>Ghost large</Tag>
            <Rating rating={rating} isEditable setRating={setRating}/>
            <Input placeholder='Тест'/>
            <TextArea placeholder='Тест текст ареа'/>
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0; // Категория для сайдабр меню - всегда такая
    const {data: menu} = await axios.post<MenuItem[]>(
        API.topPage.find,
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