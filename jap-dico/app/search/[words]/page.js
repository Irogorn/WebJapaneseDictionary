import React from "react";
import styles from "./Definitions.module.css";
import CardDetail from "../../../components/CardDetail.jsx";
import CardKanji from "../../../components/CardKanji.jsx";

async function getDefinitions(words) {
    let patch = words.replaceAll("%%","%25%")
    const res = await fetch(`http://localhost:8080/search/${patch}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}


export default async function Definitions({ params }) {
    const { words } = params;
    const [definitions, kanjis] = await getDefinitions(words);

    return (
        <>
            {definitions.length === 0 || definitions === undefined ? (
                <div className={styles.noFound}>
                    {`No results found for ${words}`}
                </div>
            ) : (
                <>
                    <div
                        className={styles.page}
                    >
                        <div
                            className={styles.center}
                        >
                            <div
                                className={styles.word}
                            >
                                {definitions.map((def, i) => {
                                    return (
                                        <div key={`details-${i}`}>
                                            <CardDetail
                                                key={`detail-${def.word._id}`}
                                                def={def.word}
                                                fr={def.word.WordsFRs}
                                                verb={def.tenseVerbs}
                                                adj={def.tenseAdjs}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div
                                className={styles.kanjis}
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
