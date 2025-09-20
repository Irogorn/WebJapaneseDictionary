'use client'
import React, { useState } from "react";
import {Link, usePathname} from "../navigation";
import SearchBar from "./SearchBar"
import styles from "./NavBar.module.css"
import Image from "next/image";
import {useTranslations, useLocale} from 'next-intl';
import { locales } from '../navigation';

export default function NavBar(){
    const [word, setWord] = useState('');
    const t = useTranslations('NavBar');
    const locale = useLocale();
    const pathname = usePathname();

    const handleClearSearch = () => {
        setWord('');
    };

    return(
        <>
            <nav className={styles.nav}>
                <Link href='/' onClick={handleClearSearch}>
                    <Image className={styles.image} src="/sakura.png" alt="sakura" width={37} height={37}/>
                </Link>
                <Link className={`${styles.button} ${styles.homeLink}`} href="/" onClick={handleClearSearch}>{t('home')}</Link>
                <SearchBar word={word} setWord={setWord} />
                {locales.map((loc) => (
                    <Link
                        key={loc}
                        href={pathname}
                        locale={loc}
                        className={`${styles.button} ${locale === loc ? styles.active : ''}`}
                    >
                        {loc.toUpperCase()}
                    </Link>
                ))}
            </nav>
        </>
    );
}
