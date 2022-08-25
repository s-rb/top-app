import {SearchProps} from "./Search.props";
import {inspect} from "util";
import styles from './Search.module.css';
import cn from "classnames";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import React, {useState} from "react";
import GlassIcon from './glass.svg';
import {useRouter} from "next/router";

export const Search = ({className, ...props}: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    // Переходим на страницу по пути search и добавляем query параметры
    const goToSearch = () => {
        router.push({
            pathname: '/search', query: {
                q: search
            }
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            goToSearch();
        }
    }

    return (
        <form className={cn(className, styles.search)} {...props} role="search">
            <Input
                className={styles.input}
                placeholder='Поиск...'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
            />
            <Button
                appearance='primary'
                className={styles.button}
                onClick={() => goToSearch()}
                aria-label="Искать по сайту"
            >
                <GlassIcon/>
            </Button>
        </form>
    )
};