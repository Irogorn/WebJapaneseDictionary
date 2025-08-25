export function conjugate(word, fr, bluish_word, verb_adj) {
    let entries = Object.entries(verb_adj);
    let conjugatedVerb = "";
    if (word.def.type === "i") {
        for (let e of entries) {
            if (e[0] === fr.tense + "_hi") {
                conjugatedVerb =
                    bluish_word.substring(0, bluish_word.length - 1) + e[1];
            }
        }
    } else if (word.def.type === "na") {
        for (let e of entries) {
            if (e[0] === fr.tense + "_hi") {
                conjugatedVerb = bluish_word + e[1];
            }
        }
    } else if (word.def.type === "godan") {
        for (let e of entries) {
            if (e[0] === fr.tense + "_hi") {
                conjugatedVerb =
                    bluish_word.substring(0, bluish_word.length - 1) + e[1];
            }
        }
    } else if (word.def.type === "ichidan") {
        for (let e of entries) {
            if (e[0] === fr.tense + "_hi") {
                conjugatedVerb =
                    bluish_word.substring(0, bluish_word.length - 1) + e[1];
            }
        }
    } else if (word.def.type === "irregular") {
        for (let e of entries) {
            if (e[0] === fr.tense + "_hi") {
                conjugatedVerb =
                    bluish_word.substring(0, bluish_word.length - 2) + e[1];
            }
        }
    }
    return conjugatedVerb;
}

export function listWord(props, fr, type) {
    let tmp = [];
    let innerTmp = [];
    for (let w of fr) {
        innerTmp.push(blueword(w, w.fr_definition));
        innerTmp.push(bluewordJP(props, w, type));
        tmp.push(innerTmp);
        innerTmp = [];
    }
    return tmp;
}

export function listDetail(fr) {
    let french = "";
    let fr_explication = "";
    let s = 0;
    for (let w of fr) {
        if (s) {
            french = french.concat(", ", w.french);
            if (fr_explication.indexOf(w.fr_explication) === -1) {
                fr_explication = fr_explication.concat(", ", w.fr_explication);
            }
        } else {
            french = w.french;
            fr_explication = w.fr_explication;
        }
        ++s;
    }

    if (fr_explication === ",") {
        fr_explication = "";
    }

    if (fr_explication[0] === ",") {
        fr_explication = fr_explication.substring(1, fr_explication.length);
    }

    if (french[french.length - 2] === ",") {
        french = french.substring(0, french.length - 2);
    }

    return [{ french, fr_explication }];
}

export function blueword(fr, sentence) {
    if (fr.blue_word === "noBw") {
        return <>{sentence}</>;
    }

    let blueword = fr.blue_word !== "" ? fr.blue_word : fr.french;

    let i = sentence.indexOf(blueword);

    if (i === -1) {
        blueword = blueword.charAt(0).toUpperCase() + blueword.slice(1);
        i = sentence.indexOf(blueword);
    }

    return (
        <>
            {sentence.substring(0, i)}{" "}
            <span style={{ color: "blue" }}>{blueword}</span>
            {sentence.substring(i + blueword.length, sentence.length)}
        </>
    );
}

export function bluewordJP(props, fr, type) {
    let sentence = fr.jp_definition;
    let writing = "";

    writing =
        props.def.jp_kanji !== "" && props.def.nb_hi !== ""
            ? props.def.jp_kanji
            : props.def.jp_hiragana !== ""
            ? props.def.jp_hiragana
            : props.def.jp_katakana;
    if (type && (props.verb !== undefined && props.verbs !== null)) {
        let iku = writing === '行く';
        let kuru = writing === '来る';
        writing = conjugate(props, fr, writing, props.verb || props.adj);
        if(iku){
            writing = writing.replace(writing[0],"行");
        }
        if(kuru){
            writing = writing.replace(writing[0],"来");
        }
    }

    const i = sentence.indexOf(writing);
    return (
        <>
            {sentence.substring(0, i)}
            <span style={{ color: "blue" }}>{writing}</span>
            {sentence.substring(i + writing.length, sentence.length)}
        </>
    );
}

const kurikaeshi = "[々ゝゞヽヾ]";

export const containsHuriKaeshi = (str) => {
    return new RegExp(kurikaeshi).test(str);
};

export function giveByKanjiFurigawa(hasKuriKaeshi, jpHiragana, nbHi) {
    let tab = [];

    if (nbHi) {
        if (hasKuriKaeshi) {
            nbHi = (nbHi / 2).toString() + ";" + (nbHi / 2).toString();
        }
        const nbHiragana = nbHi.split(";");
        let i = 0;
        for (let h of nbHiragana) {
            const k = parseInt(h);
            if (k > 0) {
                tab = [...tab, jpHiragana.substring(i, k + i)];
                i = i + k;
            }
            else{
                tab = [...tab, ""];
                i = i - k;
            }
        }
    } else {
        tab = [...tab, jpHiragana];
    }

    return tab;
}

export const giveMeRoot = (props) => {
    let root = "";
    let composed = false;
    if (props.adj === undefined) {
        if (new RegExp(/.+(する)$/g).test(props.def.jp_kanji)) {
            root = props.def.jp_kanji.substring(
                0,
                props.def.jp_kanji.length - 2
            );
            composed = true;
        }
        else{
            root = props.def.jp_kanji.substring(
                0,
                props.def.jp_kanji.length - 1
            );
            if (root === "") {
                return props.def.jp_hiragana.substring(
                    0,
                    props.def.jp_hiragana.length - 1
                );
            }
        }
        return {root,composed};
    } else {
        if (props.adj.type === "i") {
            let root = props.def.jp_kanji.substring(
                0,
                props.def.jp_kanji.length - 1
            );
            if (root === "") {
                return props.def.jp_hiragana.substring(
                    0,
                    props.def.jp_hiragana.length - 1
                );
            }
            return {root,composed};
        }
        return {root:props.def.jp_kanji,composed};
    }
};

export const irregularVerb = (root, composed) => {
    return (root !== "する" && root !== "くる" && root !== "いく") || composed;
};
