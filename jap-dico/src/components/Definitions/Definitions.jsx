import React, { useState, useEffect, useContext } from "react";
import styles from "./Definitions.module.css";
import axios from "axios";
import { UserContext } from "../Context/Context";
import { useRouter } from "next/router";
import CardDetail from "../CardDetail/CardDetail";
import CardKanji from "../CardKanji/CardKanji";
import Commentaries from "../Commentaries/Commentaries";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

export default function Definitions() {
    const { setWord } = useContext(UserContext);
    const { go } = useContext(UserContext);
    const router = useRouter();
    const { words } = router.query;
    const [definitions, setDefinitions] = useState([]);
    const [kanjis, setKanjis] = useState([]);
    const { t } = useTranslation();

    const isSmartPhone = useMediaQuery({ query: "(max-width: 700px)" });

    useEffect(() => {
        if (!words) return;
        let patch = words.replaceAll("%%","%25%")
        setWord(decodeURIComponent(patch));

        axios
            .get(`/search/${patch}`)
            .then((result) => {
                setDefinitions(result.data[0]);
                setKanjis(result.data[1]);
            })
            .catch((err) => {
                console.log(err);
            });

        return () => {};
    }, [go, setWord, words]);

    return (
        <>
            {definitions.length === 0 || definitions === undefined ? (
                <div className={styles.noFound}>
                    {t("noFound", {words: words})}
                </div>
            ) : (
                <>
                    <div
                        className={
                            isSmartPhone === false ? styles.page : styles.adapt
                        }
                    >
                        <div
                            className={
                                isSmartPhone === false
                                    ? styles.center
                                    : styles.centeradapt
                            }
                        >
                            <div
                                className={
                                    isSmartPhone === false
                                        ? styles.word
                                        : styles.wordadapt
                                }
                            >
                                {definitions.map((def, i) => {
                                    console.log(def);
                                    return (
                                        <div key={`details-${i}`}>
                                            <CardDetail
                                                key={`detail-${def.word._id}`}
                                                def={def.word}
                                                fr={def.word.WordsFRs}
                                                verb={def.tenseVerbs}
                                                adj={def.tenseAdjs}
                                            />
                                            <Commentaries
                                                key={`comm-${def.word._id}`}
                                                wordId={def.word._id}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div
                                className={
                                    isSmartPhone
                                        ? styles.kanjisadapt
                                        : styles.kanjis
                                }
                            >
                                {kanjis.map((kanji, i) => {
                                    return (
                                        <div key={`kanjis-${i}`}>
                                            {kanji.kanji !== "" && (
                                                <CardKanji
                                                    key={`kanji-${i}`}
                                                    def={kanji.kanji}
                                                    fr={kanji.kanji.KanjisFR}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
