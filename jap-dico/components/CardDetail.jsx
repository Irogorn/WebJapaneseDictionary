'use client'
import React, { useState } from "react";
import styles from "./CardDetail.module.css";
import Conjugation from "./Conjugation";
import {
    containsHuriKaeshi,
    giveByKanjiFurigawa,
    listWord,
    listDetail,
    giveMeRoot,
} from "../tools/tools";

export default function CardDetail(props) {
    const [show, setShow] = useState(false);

    const handleForm = () => {
        setShow(true);
    };

    return (
        <div className={styles.card}>
            <div className={styles.group_up}>
                {listDetail(props.fr).map((obj, i) => {
                    return (
                        <div key={`header-${i}`}>
                            <div key={`french-${i}`} className={styles.french}>
                                {obj.french}
                            </div>
                            {obj.fr_explication && (
                                <div
                                    key={`explication-${i}`}
                                    className={styles.explication}
                                >
                                    <span className={styles.text}>
                                        information supplémentaire :
                                    </span>{" "}
                                    {obj.fr_explication}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={styles.group}>
                {props.def.jp_kanji !== "" ? (
                    props.def.nb_hi === "" ? (
                        <div className={styles.jpatejiflex}>
                            <div className={styles.jpatejiup}>{props.def.jp_hiragana}</div>
                            <div className={styles.jpateji}>{props.def.jp_kanji}</div>
                        </div>
                    ) : (
                        Array.from(props.def.jp_kanji).map((kanji, i) => {
                            return (
                                <div
                                    key={`furigana-${i}`}
                                    className={styles.jpword}
                                    furigana={
                                        giveByKanjiFurigawa(
                                            containsHuriKaeshi(
                                                props.def.jp_kanji
                                            ),
                                            props.def.jp_hiragana,
                                            props.def.nb_hi
                                        )[i] ?? "  "
                                    }
                                >
                                    {kanji}
                                </div>
                            );
                        })
                    )
                ) : props.def.jp_hiragana !== "" ? (
                    <div
                        key={`autre-${props.def.jp_romanji}`}
                        className={styles.jpword}
                    >
                        {" "}
                        {props.def.jp_hiragana}{" "}
                    </div>
                ) : (
                    <div className={styles.jpword}>
                        {" "}
                        {props.def.jp_katakana}{" "}
                    </div>
                )}
                <div className={styles.group_two}>
                    <div className={styles.types}>{props.def.type}</div>
                    {((props.verb !== undefined && props.verb !== null) || (props.adj !== undefined && props.adj !== null)) && (
                        <button className={styles.form} onClick={handleForm}>
                            Conjugation
                        </button>
                    )}
                    {show && (
                        <Conjugation
                            root={giveMeRoot(props)}
                            stem={
                                props.verb !== undefined && props.verb.stem_hi
                            }
                            verb={props.verb}
                            adj={props.adj}
                            close={setShow}
                        />
                    )}
                </div>
            </div>
            {listWord(
                props,
                props.fr,
                props.verb !== undefined || props.adj !== undefined
            ).map((fr, i) => {
                return (
                    <div key={`example-${i}`}>
                        <div key={`fr-${i}`} className={styles.fr}>
                            {fr[0]}
                        </div>
                        <div key={`jp-${i}`} className={styles.jp}>
                            {fr[1]}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
