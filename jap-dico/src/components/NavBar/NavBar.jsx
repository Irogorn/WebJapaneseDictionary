import React, {useContext} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "../SearchBar/SearchBar"
import styles from "./NavBar.module.css"
import { UserContext } from "../Context/Context";
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from "react-i18next";

export default function NavBar(){
    const { t } = useTranslation();
    const router = useRouter();

    const {granted, setGranted, setUserName, setUserId,selected,setSelected} = useContext(UserContext)

    const isSmartPhoneMax600 = useMediaQuery({ query: '(max-width: 700px)' })
    const isSmartPhoneMin300 = useMediaQuery({ query: '(min-width: 360px)' })

    const disconnect = () =>{
        localStorage.removeItem("token");
        setSelected(1)
        setUserId(0)
        setUserName("")
        setGranted(null)
    }

    return(
        <>
            {
                (isSmartPhoneMax600 && isSmartPhoneMin300) === false ?  <nav className={styles.nav}>
                <Link href='/' onClick={()=>{setSelected(1)}}>
                    <img className={styles.image} src="\sakura.png" alt="sakura"/>
                </Link>
                <Link className={`${styles.button} ${router.pathname === "/" ? styles.active : ""}`} href="/" onClick={()=>{setSelected(1)}}>{t('home')}</Link>
                <SearchBar/>
                {
                    granted === null ? <Link className={`${styles.button} ${router.pathname === "/login" ? styles.active : ""}`} href="/login" onClick={()=>{setSelected(2)}}>{t('login')}</Link>
                    : <Link className={`${styles.button} ${router.pathname === "/account" ? styles.active : ""}`} href="/account" onClick={()=>{setSelected(2);}}>{t('account')}</Link>
                }
                {
                granted === null ? <Link className={`${styles.button} ${router.pathname === "/subscription" ? styles.active : ""}`} href="/subscription" onClick={()=>{setSelected(3)}}>{t('subscribe')}</Link>
                : <Link className={styles.button} href="/" onClick={()=>{disconnect()}}>{t('disconnect')}</Link>
                }
                </nav> :
                <>
                    <nav className={styles.nav}>
                    <Link href='/' onClick={()=>{setSelected(1)}}>
                        <img className={(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.image : styles.imageadapt} src="\sakura.png" alt="sakura"/>
                    </Link>
                    <Link className={`${(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.button : styles.buttonadapt} ${router.pathname === "/" ? styles.active : ""}`} href="/" onClick={()=>{setSelected(1)}}>{t('home')}</Link>
                    {
                        granted === null ? <Link className={`${(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.button : styles.buttonadapt} ${router.pathname === "/login" ? styles.active : ""}`} href="/login" onClick={()=>{setSelected(2)}}>{t('login')}</Link>
                        : <Link className={`${(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.button : styles.buttonadapt} ${router.pathname === "/account" ? styles.active : ""}`} href="/account" onClick={()=>{setSelected(2)}}>{t('account')}</Link>
                    }
                    {
                    granted === null ? <Link className={`${(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.button : styles.buttonadapt} ${router.pathname === "/subscription" ? styles.active : ""}`} href="/subscription" onClick={()=>{setSelected(3)}}>{t('subscribe')}</Link>
                    : <Link className={`${(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.button : styles.buttonadapt}`} href="/" onClick={()=>{disconnect()}}>{t('disconnect')}</Link>
                    }
                    </nav>
                    <SearchBar/>
                </>
                }
        </>
    );
}