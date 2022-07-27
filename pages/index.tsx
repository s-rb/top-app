import {Button, Htag, Ptag} from "../components";

export default function Home(): JSX.Element {
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
        </>
    );
}
