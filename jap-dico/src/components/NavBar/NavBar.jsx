import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"
import styles from "./NavBar.module.css"
import { UserContext } from "../Context/Context";
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from "react-i18next";

export default function NavBar(){
    const { t } = useTranslation();

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
                <NavLink to='/' onClick={()=>{setSelected(1)}}>
                    <img className={styles.image} src="\sakura.png" alt="sakura"/>
                </NavLink>
                <NavLink className={`${styles.button} ${selected === 1 && styles.active}`} to="/" onClick={()=>{setSelected(1)}}>{t('home')}</NavLink>
                <SearchBar/>
                {
                    granted === null ? <NavLink className={`${styles.button} ${selected === 2 && styles.active}`} to="/login" onClick={()=>{setSelected(2)}}>{t('login')}</NavLink>
                    : <NavLink className={`${styles.button} ${selected === 2 && styles.active}`} to="/account" onClick={()=>{setSelected(2);}}>{t('account')}</NavLink>
                }
                {
                granted === null ? <NavLink className={`${styles.button} ${selected === 3 && styles.active}`} to="/subscription" onClick={()=>{setSelected(3)}}>{t('subscribe')}</NavLink>
                : <NavLink className={`${styles.button} ${selected === 3 && styles.active}`} to="/" onClick={()=>{disconnect()}}>{t('disconnect')}</NavLink>
                }
                </nav> :
                <>
                    <nav className={styles.nav}>
                    <NavLink to='/' onClick={()=>{setSelected(1)}}>
                        <img className={(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.image : styles.imageadapt} src="\sakura.png" alt="sakura"/>
                    </NavLink>
                    <NavLink className={`${(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.button : styles.buttonadapt} ${selected === 1 && styles.active}`} to="/" onClick={()=>{setSelected(1)}}>{t('home')}</NavLink>
                    {
                        granted === null ? <NavLink className={`${(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.button : styles.buttonadapt} ${selected === 2 && styles.active}`} to="/login" onClick={()=>{setSelected(2)}}>{t('login')}</NavLink>
                        : <NavLink className={`${(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.button : styles.buttonadapt} ${selected === 2 && styles.active}`} to="/account" onClick={()=>{setSelected(2)}}>{t('account')}</NavLink>
                    }
                    {
                    granted === null ? <NavLink className={`${(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.button : styles.buttonadapt} ${selected === 3 && styles.active}`} to="/subscription" onClick={()=>{setSelected(3)}}>{t('subscribe')}</NavLink>
                    : <NavLink className={`${(isSmartPhoneMax600 && isSmartPhoneMin300)  === false ? styles.button : styles.buttonadapt} ${selected === 3 && styles.active}`} to="/" onClick={()=>{disconnect()}}>{t('disconnect')}</NavLink>
                    }
                    </nav>
                    <SearchBar/>
                </>
                }
        </>
    );
}