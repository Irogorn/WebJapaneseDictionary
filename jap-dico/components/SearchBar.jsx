'use client'
import React, {useState} from "react";
import styles from "./SearchBar.module.css"
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

export default function SearchBar(){
    const [word,setWord] = useState('');
    const router = useRouter();

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        router.push(`/search/${word}`);
    }

    const handleCleared = (event) =>{
        event.preventDefault();
        setWord('')
    }

    return(
        <div className={styles.search}>
            <form className={styles.field__button} onSubmit={handleSubmit}>
                <input className={styles.field} type="text" placeholder="Search..." onChange={(event)=>{setWord(event.target.value.replace("%%","%25"))}} value={word}/>
                <button className={styles.clear} type="reset" onKeyDown={handleCleared} onClick={handleCleared}><FontAwesomeIcon icon={faXmark} /></button>
                <button type="submit" className={styles.button}>
                    {<FontAwesomeIcon icon={faMagnifyingGlass} />}
                </button>
            </form>
        </div>
    );
}
