'use client'
import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar"
import styles from "./NavBar.module.css"
import Image from "next/image";


export default function NavBar(){

    return(
        <>
            <nav className={styles.nav}>
                <Link href='/'>
                    <Image className={styles.image} src="/sakura.png" alt="sakura" width={37} height={37}/>
                </Link>
                <Link className={`${styles.button}`} href="/">Home</Link>
                <SearchBar/>
            </nav>
        </>
    );
}
