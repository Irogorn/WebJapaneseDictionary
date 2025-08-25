import React from "react";
import styles from "./Welcome.module.css";

export default function Welcome() {
    return (
        <div className={styles.block}>
            <h1>
                Bienvenue sur le dictionnaire de japonais !
            </h1>
            <div>
                <div>
                    <h2 >
                        Les fonctionnalités sont les suivants :
                    </h2>
                    <ul className={styles.list}>
                        <li>Recherche à partir d’<span className={styles.line}>un mot en français</span>;
                        </li>
                        <li>
                            Recherche à partir d’<span className={styles.line}>un mot en japonais écrit en
                            romaji, hiragana, katakana et/ou kanji</span>;
                        </li>
                        <li>
                            Recherche à partir d’<span className={styles.line}>un texte japonais (le texte ne
                            doit pas être entièrement écrit en romaji);</span>
                        </li>
                        <li>
                            Pour les verbes et adjectifs <span className={styles.line}>les conjugaisons sont
                            disponibles</span>;
                        </li>
                        <li>Chaque kanji a des <span className={styles.line}>informations détaillés</span>;
                        </li>
                        <li>
                            Pour <span className={styles.line}>chaque défintion des mots japonais</span>, il y a <span className={styles.line}>un
                            exemple concret</span>.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
