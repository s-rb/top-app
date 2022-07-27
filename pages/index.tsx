import {Button, Htag} from "../components";

export default function Home(): JSX.Element {
    return (
        <>
            <Htag tag='h1'>Text</Htag>
            <Htag tag='h2'>Text</Htag>
            <Htag tag='h3'>Text</Htag>
            <Button appearance="primary" arrow='right'>Кнопка</Button>
            <Button appearance="ghost" arrow='down'>Кнопка</Button>
        </>
    );
}
