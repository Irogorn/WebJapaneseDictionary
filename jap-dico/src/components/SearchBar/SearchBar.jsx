import React, {useContext} from "react";
import styles from "./SearchBar.module.css"
import { useRouter } from "next/router";
import { UserContext } from "../Context/Context";
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

export default function SearchBar(){
    const { t } = useTranslation();
    const {word,setWord} = useContext(UserContext);
    const {go,setGo, setSelected} = useContext(UserContext);
    const router = useRouter();

    const isSmartPhoneMax600 = useMediaQuery({ query: '(max-width: 700px)' })
    const isSmartPhoneMin300 = useMediaQuery({ query: '(min-width: 360px)' }) 

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        setSelected(1);

        router.push(`/search/${word}`);
        if(go === false)
        {
            setGo(true);
        }
        else{
            setGo(false);
        }
    }

    const handleCleared = (event) =>{
        event.preventDefault();
        setWord('')
    }

    return(
        <div className={styles.search}>
            <form className={styles.field__button} onSubmit={handleSubmit}>
                <input className={styles.field} type="text" placeholder={t('placeholdersearch')} onChange={(event)=>{setWord(event.target.value.replace("%%","%25"))}} value={word}/>
                <button className={styles.clear} type="reset" onKeyDown={handleCleared} onClick={handleCleared}><FontAwesomeIcon icon={faXmark} /></button>
                <button type="submit" className={(isSmartPhoneMax600 && isSmartPhoneMin300) ? styles.searchIcon : styles.button}>
                    {<FontAwesomeIcon icon={faMagnifyingGlass} />} 
                </button>
            </form>
        </div>
    );
}