import React from 'react'
import styles from './CardKanji.module.css'
import { useTranslation } from "react-i18next";

export default function CardKanji(props) {
    const { t } = useTranslation();
    return (
        <div className={styles.card}>
            <div className={styles.group_three}>
                <div className={styles.order}>
                    <div className={styles.kanji}>{props.def.kanji}</div>
                    <div className={styles.jlpt_and_co}>
                        <p className={styles.jlpt}>JLPT{props.def.jlpt}</p>
                        <p className={styles.strokes}>{props.def.nb_strokes} {t('strokes')}</p>
                    </div>
                </div>
            
                <div className={styles.reading}>
                    {props.def.kun !== '' && <div className={styles.kun}>{t('kunreading')} : {props.def.kun}</div>}
                    {props.def.kun !== '' && <div className={styles.meaning}>{props.fr && props.fr.kun_fr}</div>}
                    {props.def.s_kun !== '' && <div className={styles.kun}>{t('kunreading')} : {props.def.s_kun}</div>}
                    {props.def.s_kun !== '' && <div className={styles.meaning}>{props.fr && props.fr.s_kun_fr}</div>}
                    {props.def.s_kun_2 !== '' && <div className={styles.kun}>{t('kunreading')} : {props.def.s_kun_2}</div>}
                    {props.def.s_kun_2 !== '' && <div className={styles.meaning}>{props.fr && props.fr.s_kun_fr_2}</div>}
                    {props.def.s_kun_3 !== '' && <div className={styles.kun}>{t('kunreading')} : {props.def.sKun3}</div>}
                    {props.def.s_kun_3 !== '' && <div className={styles.meaning}>{props.fr && props.fr.s_kun_fr_3}</div>} 
                    {props.def.on !== '' && <div className={styles.on}>{t('onreading')} : {props.def.on}</div>}
                    {props.def.on !== '' && <div className={styles.meaning}>{props.fr && props.fr.on_fr}</div>}
                    {props.def.s_on !== '' && <div className={styles.on}>{t('onreading')} : {props.def.s_on}</div>}
                    {props.def.s_on !== '' && <div className={styles.meaning}>{props.fr && props.fr.s_on_fr}</div>}
                    {props.def.s_on_2 !== '' && <div className={styles.on}>{t('onreading')} :  {props.def.s_on_2}</div>}
                    {props.def.s_on_2 !== '' && <div className={styles.meaning}>{props.fr && props.fr.s_on_fr_2}</div>}

                </div>
            </div>
        </div>
    )
}

/*on	string
onKa	string
onRo	string
kun	string
kunRo	string
sKun	string
sKunRo	string
sOn	string
sOnKa	string
sOnRo	string
sKun2	string
sKunRo2	string
sOn2	string
sOnKa2	string
sOnRo2	string
sKun3	string
sKunRo3	string*/
