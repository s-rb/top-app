import {Button, Htag, Ptag, Tag} from "../components";

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

            <Tag size='medium'>Default medium</Tag>
            <Tag size='large' color='red'>Red large</Tag>
            <Tag color='grey' size='medium'>Grey medium</Tag>
            <Tag size='large' color='green'>Green large</Tag>
            <Tag color='primary'>Primary default</Tag>
            <Tag color='ghost' size='large'>Ghost large</Tag>
        </>
    );
}
