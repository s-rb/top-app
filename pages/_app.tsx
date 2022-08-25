import '../styles/globals.css';
import React from 'react';
import {AppProps} from "next/dist/shared/lib/router/router";
import Head from "next/head";
import Router from 'next/router';
import ym from 'react-yandex-metrika';
import {YMInitializer} from 'react-yandex-metrika';

// При каждом изменении роута отправляются в яндекс метрику что мы захитились
Router.events.on('routeChangeComplete', (url: string) => {
    // Мы не на сервере, а на клиенте
    if (typeof window !== 'undefined') {
        ym('hit', url);
    }
});

function MyApp({Component, pageProps, router}: AppProps): JSX.Element {

    return <>
        <Head>
            <title>MyTop - наш лучший топ</title>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link rel="preconnect" href="https://mc.yandex.ru"/>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap"
                  rel="stylesheet"/>
            <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
            <meta property='og:locale' content="ru_RU"/>
        </Head>
        {/*Включаем вебвизор и откладываем загрузку метрики до загруэки приложения*/}
        <YMInitializer
            accounts={[]}
            options={{webvisor: true,defer: true}}
            version='2'
        />
        <Component {...pageProps}/>
    </>;
}

export default MyApp;
