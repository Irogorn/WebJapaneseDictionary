import React from 'react'
import styles from './CardKanji.module.css'

export default function CardKanji(props) {
    return (
        <div className={styles.card}>
            <div className={styles.group_three}>
                <div className={styles.order}>
                    <div className={styles.kanji}>{props.def.kanji}</div>
                    <div className={styles.jlpt_and_co}>
                        <p className={styles.jlpt}>JLPT{props.def.jlpt}</p>
                        <p className={styles.strokes}>{props.def.nb_strokes} strokes</p>
                    </div>
                </div>
            
                <div className={styles.reading}>
                    {props.def.kun !== '' && <div className={styles.kun}>Kun reading : {props.def.kun}</div>}
                    {props.def.kun !== '' && <div className={styles.meaning}>{props.fr && props.fr.kun_fr}</div>}
                    {props.def.s_kun !== '' && <div className={styles.kun}>Kun reading : {props.def.s_kun}</div>}
                    {props.def.s_kun !== '' && <div className={styles.meaning}>{props.fr && props.fr.s_kun_fr}</div>}
                    {props.def.s_kun_2 !== '' && <div className={styles.kun}>Kun reading : {props.def.s_kun_2}</div>}
                    {props.def.s_kun_2 !== '' && <div className={styles.meaning}>{props.fr && props.fr.s_kun_fr_2}</div>}
                    {props.def.s_kun_3 !== '' && <div className={styles.kun}>Kun reading : {props.def.sKun3}</div>}
                    {props.def.s_kun_3 !== '' && <div className={styles.meaning}>{props.fr && props.fr.s_kun_fr_3}</div>} 
                    {props.def.on !== '' && <div className={styles.on}>On reading : {props.def.on}</div>}
                    {props.def.on !== '' && <div className={styles.meaning}>{props.fr && props.fr.on_fr}</div>}
                    {props.def.s_on !== '' && <div className={styles.on}>On reading : {props.def.s_on}</div>}
                    {props.def.s_on !== '' && <div className={styles.meaning}>{props.fr && props.fr.s_on_fr}</div>}
                    {props.def.s_on_2 !== '' && <div className={styles.on}>On reading :  {props.def.s_on_2}</div>}
                    {props.def.s_on_2 !== '' && <div className={styles.meaning}>{props.fr && props.fr.s_on_fr_2}</div>}

                </div>
            </div>
        </div>
    )
}
