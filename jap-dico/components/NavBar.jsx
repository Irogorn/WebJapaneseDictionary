'use client'
import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar"
import styles from "./NavBar.module.css"
import Image from "next/image";


export default function NavBar(){
    const [word, setWord] = useState('');

    const handleClearSearch = () => {
        setWord('');
    };

    return(
        <>
            <nav className={styles.nav}>
                <Link href='/' onClick={handleClearSearch}>
                    <Image className={styles.image} src="/sakura.png" alt="sakura" width={37} height={37}/>
                </Link>
                <Link className={`${styles.button} ${styles.homeLink}`} href="/" onClick={handleClearSearch}>Home</Link>
                <SearchBar word={word} setWord={setWord} />
            </nav>
        </>
    );
}
