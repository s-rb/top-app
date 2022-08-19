import {useEffect, useState} from "react";

export const useScrollY = ():number => {
    const isBrowser = typeof window !== 'undefined'; // если тип андефайнед - это браузер, а если нет, то код выполняется на сервере

    const [scrollY, setScrollY] = useState<number>(0);

    const handleScroll = () => {
        const currentScrollY = isBrowser ? window.scrollY : 0;
        setScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        // То что возвращается позволяет отписаться в юз эффекте
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollY;
}