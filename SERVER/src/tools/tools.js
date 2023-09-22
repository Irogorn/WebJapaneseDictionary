import CryptoJS from "crypto-js";

export function detailledString(lookUp) {
    let workingString = "";
    let alpabetType = "";

    /*lookUp = convertHiraganaToRomanji(lookUp);*/
    lookUp = convertKatakanaToRomanji(lookUp);

    for (let i = 0; i < lookUp.length; i++) {
        let bHiragana = lookUp[i] <= "\u309F" && lookUp[i] >= "\u3040";
        let bKatakana = lookUp[i] <= "\u30FF" && lookUp[i] >= "\u30A0";
        let bKanji = lookUp[i] <= "\u9FAF" && lookUp[i] >= "\u4E00";
        let bRomanji =
            (lookUp[i] >= "\u0030" && lookUp[i] <= "\u0039") ||
            (lookUp[i] >= "\u0041" && lookUp[i] <= "\u005A") ||
            (lookUp[i] >= "\u0061" && lookUp[i] <= "\u007A") ||
            (lookUp[i] >= "\u00C0" && lookUp[i] <= "\u00FF");

        //hiragana
        if (bHiragana) {
            workingString += lookUp[i];
        }
        //katakana
        else if (bKatakana) {
            //   console.log(`Katakana: ${lookUp[i]}`);
            workingString += lookUp[i];
        }
        //kanji
        else if (bKanji) {
            workingString += lookUp[i];
        }
        //Romanji
        else {
            workingString += lookUp[i];
        }

        let bHiraganaNext =
            lookUp[i + 1] <= "\u309F" && lookUp[i + 1] >= "\u3040";
        let bKatakanaNext =
            lookUp[i + 1] <= "\u30FF" && lookUp[i + 1] >= "\u30A0";
        let bKanjiNext = lookUp[i + 1] <= "\u9FAF" && lookUp[i + 1] >= "\u4E00";
        let bRomanjiNext =
            (lookUp[i + 1] >= "\u0030" && lookUp[i + 1] <= "\u0039") ||
            (lookUp[i + 1] >= "\u0041" && lookUp[i + 1] <= "\u005A") ||
            (lookUp[i + 1] >= "\u0061" && lookUp[i + 1] <= "\u007A") ||
            (lookUp[i + 1] >= "\u00C0" && lookUp[i + 1] <= "\u00FF");

        if (bHiragana && !bHiraganaNext) {
            if (i < lookUp.length - 1) {
                workingString += "!";
            }

            alpabetType += "H";
        } else if (bKatakana && !bKatakanaNext) {
            if (i < lookUp.length - 1) {
                workingString += "!";
            }

            // A stands for kAtakana to avoid conflict wiht K of Kanji.
            alpabetType += "A";
        } else if (bKanji && !bKanjiNext) {
            if (i < lookUp.length - 1) {
                workingString += "!";
            }

            alpabetType += "K";
        } else if (bRomanji && !bRomanjiNext) {
            if (i < lookUp.length - 1) {
                workingString += "!";
            }
            alpabetType += "R";
        }
    }

    let workedString = workingString.split("!");

    var jp_romaji = "",
        jp_hiragana = "",
        jp_katakana = "",
        jp_kanji = "";
    if (workedString.length == 1) {
        for (let t of alpabetType) {
            if (t == "R") {
                jp_romaji = workedString[0];
            } else if (t == "H") {
                jp_hiragana = workedString[0];
            } else if (t == "A") {
                jp_katakana = workedString[0];
            } else if (t == "K") {
                //   console.log(`ne suis pas kan ${t} // ${workedString[0]}`);
                jp_kanji = workedString[0];
            }
        }
    } else {
        for (let i = 0; i < workedString.length; i++) {
            if (i == 0) {
                workedString[i] += "%";
            } else if (i == workedString.length - 1) {
                workedString[i] = "%" + workedString[i];
            } else {
                workedString[i] = "%" + workedString[i] + "%";
            }
        }
        let m = 0,
            n = 0,
            o = 0,
            p = 0;
        for (let t = 0; t < alpabetType.length; t++) {
            if (alpabetType[t] == "R") {
                if (m > 0) {
                    for (let b = 1; b < workedString[t].length; b++) {
                        jp_romaji += workedString[t][b];
                    }
                } else {
                    jp_romaji += workedString[t];
                }
                m++;
            } else if (alpabetType[t] == "H") {
                if (n > 0) {
                    for (let b = 1; b < workedString[t].length; b++) {
                        jp_hiragana += workedString[t][b];
                    }
                } else {
                    jp_hiragana += workedString[t];
                }
                n++;
            } else if (alpabetType[t] == "Ka") {
                if (p > 0) {
                    for (let b = 1; b < workedString[t].length; b++) {
                        jp_katakana += workedString[t][b];
                    }
                } else {
                    jp_katakana += workedString[t];
                }
                p++;
            } else if (alpabetType[t] == "K") {
                if (o > 0) {
                    for (let b = 1; b < workedString[t].length; b++) {
                        jp_kanji += workedString[t][b];
                    }
                } else {
                    jp_kanji += workedString[t];
                }
                o++;
            }
        }
    }

    let obj = {};

    if (jp_romaji) {
        obj = { ...obj, jp_romaji };
    }
    if (jp_hiragana) {
        obj = { ...obj, jp_hiragana };
    }
    if (jp_katakana) {
        obj = { ...obj, jp_katakana };
    }
    if (jp_kanji) {
        obj = { ...obj, jp_kanji };
    }
    //console.log(obj);
    return obj;
}

export function containsKanji(str) {
    if (str !== undefined) {
        return new RegExp(/[\u4e00-\u9ffaf]/).test(str);
    }
    return false;
}

export function containsHiragana(str) {
    if (str !== undefined) {
        return new RegExp(/[\u3040-\u309F]/).test(str);
    }
    return false;
}

export function containsKatakana(str) {
    if (str !== undefined) {
        return new RegExp(/[\u30A0-\u30FF]/).test(str);
    }
    return false;
}

export function IsEmail(str) {
    if (str !== undefined) {
        return new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/
        ).test(str);
    }
    return false;
}

const romanjiToHiragana = {
    a: "あ",
    i: "い",
    u: "う",
    e: "え",
    o: "お",
    ka: "か",
    ki: "き",
    ku: "く",
    ke: "け",
    ko: "こ",
    sa: "さ",
    shi: "し",
    su: "す",
    se: "せ",
    so: "そ",
    ta: "た",
    chi: "ち",
    tsu: "つ",
    te: "て",
    to: "と",
    na: "な",
    ni: "に",
    nu: "ぬ",
    ne: "ね",
    no: "の",
    ha: "は",
    hi: "ひ",
    fu: "ふ",
    he: "へ",
    ho: "ほ",
    ma: "ま",
    mi: "み",
    mu: "む",
    me: "め",
    mo: "も",
    ya: "や",
    yu: "ゆ",
    yo: "よ",
    ra: "ら",
    ri: "り",
    ru: "る",
    re: "れ",
    ro: "ろ",
    wa: "わ",
    wi: "ゐ",
    we: "ゑ",
    wo: "を",
    n: "ん",
    ga: "が",
    gi: "ぎ",
    gu: "ぐ",
    ge: "げ",
    go: "ご",
    za: "ざ",
    ji: "じ",
    zu: "ず",
    ze: "ぜ",
    zo: "ぞ",
    da: "だ",
    ji: "ぢ",
    zu: "づ",
    de: "で",
    do: "ど",
    ba: "ば",
    bi: "び",
    bu: "ぶ",
    be: "べ",
    bo: "ぼ",
    pa: "ぱ",
    pi: "ぴ",
    pu: "ぷ",
    pe: "ぺ",
    po: "ぽ",
    kya: "きゃ",
    kyu: "きゅ",
    kyo: "きょ",
    gya: "ぎゃ",
    gyu: "ぎゅ",
    gyo: "ぎょ",
    sha: "しゃ",
    shu: "しゅ",
    sho: "しょ",
    ja: "じゃ",
    ju: "じゅ",
    jo: "じょ",
    cha: "ちゃ",
    chu: "ちゅ",
    cho: "ちょ",
    nya: "にゃ",
    nyu: "にゅ",
    nyo: "にょ",
    hya: "ひゃ",
    hyu: "ひゅ",
    hyo: "ひょ",
    bya: "びゃ",
    byu: "びゅ",
    byo: "びょ",
    pya: "ぴゃ",
    pyu: "ぴゅ",
    pyo: "ぴょ",
    mya: "みゃ",
    myu: "みゅ",
    myo: "みょ",
    rya: "りゃ",
    ryu: "りゅ",
    ryo: "りょ",
};

const romanjiToKatakana = {
    a: "ア",
    i: "イ",
    u: "ウ",
    e: "エ",
    o: "オ",
    ka: "カ",
    ki: "キ",
    ku: "ク",
    ke: "ケ",
    ko: "コ",
    sa: "サ",
    shi: "シ",
    su: "ス",
    se: "セ",
    so: "ソ",
    ta: "タ",
    chi: "チ",
    tsu: "ツ",
    te: "テ",
    to: "ト",
    na: "ナ",
    ni: "ニ",
    nu: "ヌ",
    ne: "ネ",
    no: "ノ",
    ha: "ハ",
    hi: "ヒ",
    fu: "フ",
    he: "ヘ",
    ho: "ホ",
    ma: "マ",
    mi: "ミ",
    mu: "ム",
    me: "メ",
    mo: "モ",
    ya: "ヤ",
    yu: "ユ",
    yo: "ヨ",
    ra: "ラ",
    ri: "リ",
    ru: "ル",
    re: "レ",
    ro: "ロ",
    wa: "ワ",
    wi: "ヰ",
    we: "ヱ",
    wo: "ヲ",
    n: "ン",
    ga: "ガ",
    gi: "ギ",
    gu: "グ",
    ge: "ゲ",
    go: "ゴ",
    za: "ザ",
    ji: "ジ",
    zu: "ズ",
    ze: "ゼ",
    zo: "ゾ",
    da: "ダ",
    ji: "ヂ",
    zu: "ズ",
    de: "デ",
    do: "ド",
    ba: "バ",
    bi: "ビ",
    bu: "ブ",
    be: "ベ",
    bo: "ボ",
    pa: "パ",
    pi: "ピ",
    pu: "プ",
    pe: "ペ",
    po: "ポ",
    kya: "キア",
    kyu: "キュ",
    kyo: "キョ",
    gya: "ギャ",
    gyu: "ギュ",
    gyo: "ギョ",
    sha: "シャ",
    shu: "シュ",
    sho: "ショ",
    ja: "ジャ",
    ju: "ジュ",
    jo: "ジョ",
    cha: "チャ",
    chu: "チャ",
    cho: "チョ",
    nya: "ニャ",
    nyu: "ニュ",
    nyo: "ニョ",
    hya: "ヒャ",
    hyu: "ヒュ",
    hyo: "ヒョ",
    bya: "ビャ",
    byu: "ビュ",
    byo: "ビョ",
    pya: "ピャ",
    pyu: "ピュ",
    pyo: "ピョ",
    mya: "ミャ",
    myu: "ミュ",
    myo: "ミョ",
    rya: "リャ",
    ryu: "リュ",
    ryo: "リョ",
};

const hiraganaToRomanji = {
    あ: "a",
    い: "i",
    う: "u",
    え: "e",
    お: "o",
    か: "ka",
    き: "ki",
    く: "ku",
    け: "ke",
    こ: "ko",
    さ: "sa",
    し: "shi",
    す: "su",
    せ: "se",
    そ: "so",
    た: "ta",
    ち: "chi",
    つ: "tsu",
    て: "te",
    と: "to",
    な: "na",
    に: "ni",
    ぬ: "nu",
    ね: "ne",
    の: "no",
    は: "ha",
    ひ: "hi",
    ふ: "fu",
    へ: "he",
    ほ: "ho",
    ま: "ma",
    み: "mi",
    む: "mu",
    め: "me",
    も: "mo",
    や: "ya",
    ゆ: "yu",
    よ: "yo",
    ら: "ra",
    り: "ri",
    る: "ru",
    れ: "re",
    ろ: "ro",
    わ: "wa",
    ゐ: "wi",
    ゑ: "we",
    を: "wo",
    ん: "n",
    が: "ga",
    ぎ: "gi",
    ぐ: "gu",
    げ: "ge",
    ご: "go",
    ざ: "za",
    じ: "ji",
    ず: "zu",
    ぜ: "ze",
    ぞ: "zo",
    だ: "da",
    ぢ: "ji",
    づ: "zu",
    で: "de",
    ど: "do",
    ば: "ba",
    び: "bi",
    ぶ: "bu",
    べ: "be",
    ぼ: "bo",
    ぱ: "pa",
    ぴ: "pi",
    ぷ: "pu",
    ぺ: "pe",
    ぽ: "po",
    きゃ: "kya",
    きゅ: "kyu",
    きょ: "kyo",
    ぎゃ: "gya",
    ぎゅ: "gyu",
    ぎょ: "gyo",
    しゃ: "sha",
    しゅ: "shu",
    しょ: "sho",
    じゃ: "ja",
    じゅ: "ju",
    じょ: "jo",
    ちゃ: "cha",
    ちゅ: "chu",
    ちょ: "cho",
    にゃ: "nya",
    にゅ: "nyu",
    にょ: "nyo",
    ひゃ: "hya",
    ひゅ: "hyu",
    ひょ: "hyo",
    びゃ: "bya",
    びゅ: "byu",
    びょ: "byo",
    ぴゃ: "pya",
    ぴゅ: "pyu",
    ぴょ: "pyo",
    みゃ: "mya",
    みゅ: "myu",
    みょ: "myo",
    りゃ: "rya",
    りゅ: "ryu",
    りょ: "ryo",
};

const katakanaToRomanji = {
    ア: "a",
    イ: "i",
    ウ: "u",
    エ: "e",
    オ: "o",
    カ: "ka",
    キ: "ki",
    ク: "ku",
    ケ: "ke",
    コ: "ko",
    サ: "sa",
    シ: "shi",
    ス: "su",
    セ: "se",
    ソ: "so",
    タ: "ta",
    チ: "chi",
    ツ: "tsu",
    テ: "te",
    ト: "to",
    ナ: "na",
    ニ: "ni",
    ヌ: "nu",
    ネ: "ne",
    ノ: "no",
    ハ: "ha",
    ヒ: "hi",
    フ: "fu",
    ヘ: "he",
    ホ: "ho",
    マ: "ma",
    ミ: "mi",
    ム: "mu",
    メ: "me",
    モ: "mo",
    ヤ: "ya",
    ユ: "yu",
    ヨ: "yo",
    ラ: "ra",
    リ: "ri",
    ル: "ru",
    レ: "re",
    ロ: "ro",
    ワ: "wa",
    ヰ: "wi",
    ヱ: "we",
    ヲ: "wo",
    ン: "n",
    ガ: "ga",
    ギ: "gi",
    グ: "gu",
    ゲ: "ge",
    ゴ: "go",
    ザ: "za",
    ジ: "ji",
    ズ: "zu",
    ゼ: "ze",
    ゾ: "zo",
    ダ: "da",
    ヂ: "ji",
    ヅ: "zu",
    デ: "de",
    ド: "do",
    バ: "ba",
    ビ: "bi",
    ブ: "bu",
    ベ: "be",
    ボ: "bo",
    パ: "pa",
    ピ: "pi",
    プ: "pu",
    ペ: "pe",
    ポ: "po",
    キャ: "kya",
    キュ: "kyu",
    キョ: "kyo",
    ギャ: "gya",
    ギュ: "gyu",
    ギョ: "gyo",
    シャ: "sha",
    シュ: "shu",
    ショ: "sho",
    ジャ: "ja",
    ジュ: "ju",
    ジョ: "jo",
    チャ: "cha",
    チュ: "chu",
    チョ: "cho",
    ニャ: "nya",
    ニュ: "nyu",
    ニョ: "nyo",
    ヒャ: "hya",
    ヒュ: "hyu",
    ヒョ: "hyo",
    ビャ: "bya",
    ビュ: "byu",
    ビョ: "byo",
    ピャ: "pya",
    ピュ: "pyu",
    ピョ: "pyo",
    ミャ: "mya",
    ミュ: "myu",
    ミョ: "myo",
    リャ: "rya",
    リュ: "ryu",
    リョ: "ryo",
};

const youOn = "[ぁぃぅぇぉゃゅょゎゕァィゥェォャュョヮヵ]";

const sukoOn = "っッ";

const chounpu = "ー";

const kurikaeshi = "々ゝゞヽヾ";

const containsYouOn = (str) => {
    return new RegExp(youOn).test(str);
};

export const convertHiraganaToRomanji = (text) => {
    let bSukoOn = false;
    let out = "";
    for (let i = 0; i < text.length; i++) {
        if (containsHiragana(text[i])) {
            if (containsYouOn(text[i + 1])) {
                out += hiraganaToRomanji[text[i] + text[i + 1]];
                i++;
            } else if (text[i] === sukoOn[0]) {
                bSukoOn = true;
            } else if (!bSukoOn) {
                out += hiraganaToRomanji[text[i]];
            } else {
                out +=
                    hiraganaToRomanji[text[i]][0] + hiraganaToRomanji[text[i]];
                bSukoOn = false;
            }
        } else {
            out += text[i];
        }
    }
    return out;
};

export const convertKatakanaToRomanji = (text) => {
    let bSukoOn = false;
    let out = "";
    for (let i = 0; i < text.length; i++) {
        if (containsKatakana(text[i])) {
            if (containsYouOn(text[i + 1])) {
                out += katakanaToRomanji[text[i] + text[i + 1]];
                i++;
            } else if (text[i] === sukoOn[1]) {
                bSukoOn = true;
            } else if (text[i] === chounpu) {
                if (
                    new RegExp("[カサタナハマヤラワガザダバパ]").test(
                        text[i - 1]
                    )
                ) {
                    out += "a";
                } else if (
                    new RegExp("[キシチニヒミリギジヂビピ]").test(text[i - 1])
                ) {
                    out += "i";
                } else if (
                    new RegExp("[ケセテネヘメレゲベペ]").test(text[i - 1])
                ) {
                    out += "i";
                } else if (
                    new RegExp(
                        "[コゴソゾトドノホモロボポスルムフブプヌウクグ]"
                    ).test(text[i - 1])
                ) {
                    out += "u";
                }
            } else if (!bSukoOn) {
                out += katakanaToRomanji[text[i]];
            } else {
                out +=
                    katakanaToRomanji[text[i]][0] + katakanaToRomanji[text[i]];
                bSukoOn = false;
            }
        } else {
            out += text[i];
        }
    }
    return out;
};

export function containsParticlesOneMore(str) {
    if (str !== undefined) {
        return new RegExp(/[はがをになかでのやとへも]/).test(str);
    }
    return false;
}

export function iNotRow(str) {
    if (str !== undefined) {
        return !new RegExp(/[りびみにちしいきぎ]$/).test(str);
    }
    return false;
}

export function containsPunctuation(str) {
    if (str !== undefined) {
        return new RegExp(/[。、？「」！・『』]/).test(str);
    }
    return false;
}

export function whatStemIsIt(
    verb_adji,
    verif_before = null,
    verif_after = null,
    verb = false
) {
    let stem = "",
        stem2 = "",
        stem3 = "";
    if (!verb) {
        stem = verb_adji.replace(/かっ$/g, "い");
        if (verb_adji === stem) stem = verb_adji.replace(/く$/g, "い");
    } else if (
        verb_adji.length === 1 &&
        (verif_after === "ます" ||
            verif_after === "まし" ||
            verif_after === "ませ" ||
            verif_after === "て")
    ) {
        if (new RegExp(/[い]$/g).test(verb_adji)) {
            stem = "いる";
        } else if (new RegExp(/^[しさ]$/g).test(verb_adji)) {
            console.log("une fois");
            stem = "する";
        } else if (new RegExp(/^[きこ来]$/g).test(verb_adji)) {
            stem = "くる";
        } else if (new RegExp(/^[み見]$/g).test(verb_adji)) {
            stem = "みる";
        }
    } else if (new RegExp(/^(みえ)/g).test(verb_adji)) {
        stem = "みえる";
    } else if (
        verb_adji === "あり" &&
        (verif_after === "ます" ||
            verif_after === "まし" ||
            verif_after === "ませ")
    ) {
        stem = "ある";
    } else if (
        iNotRow(verb_adji) &&
        (verif_after === "ます" ||
            verif_after === "まし" ||
            verif_after === "ませ" ||
            verif_after === "られ")
    ) {
        stem = verb_adji + "る";
    } else if (new RegExp(/[い]$/g).test(verb_adji) && verif_after === "て") {
        stem = verb_adji.replace(/[い]$/g, "く");
    } else if (
        new RegExp(/[い]$/g).test(verb_adji) &&
        verif_after === "ます" &&
        (verif_before === "が" || verif_before === "に")
    ) {
        stem = verb_adji.replace(/[い]$/g, "る");
    } else if (new RegExp(/[わいえ]$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[わいえ]$/g, "う");
    } else if (new RegExp(/[かきけ]$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[かきけ]$/g, "く");
        stem2 = verb_adji + "る";
    } /*else if (
        new RegExp(/[し]$/g).test(verb_adji) === false &&
        (verif_after === "て" || verif_after === "た")
    ) {
        stem = verb_adji.replace(/[し]$/g, "す");
    } */ else if (new RegExp(/[さしせ]$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[さしせ]$/g, "す");
        //stem2 = verb_adji.replace(/[さし]$/g, "する");
    } else if (new RegExp(/[たちて]$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[たちて]$/g, "つ");
    } else if (new RegExp(/[ばびべ]$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[ばびべ]$/g, "ぶ");
    } else if (new RegExp(/[らりれ]$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[らりれ]$/g, "る");
    } else if (new RegExp(/[なにね]$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[なにね]$/g, "ぬ");
    } else if (new RegExp(/[まみめ]$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[まみめ]$/g, "む");
    } else if (new RegExp(/[ん]$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[ん]$/g, "ぬ");
        stem2 = verb_adji.replace(/[ん]$/g, "む");
        stem3 = verb_adji.replace(/[ん]$/g, "ぶ");
    } else if (new RegExp(/^(行っ)$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[っ]$/g, "く");
    } else if (new RegExp(/^(言っ)$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[っ]$/g, "う");
    } else if (new RegExp(/^(あっ)$/g).test(verb_adji)) {
        stem = "ある";
    } else if (
        new RegExp(/[いっ]$/g).test(verb_adji) &&
        verif_after === "て" &&
        (verif_before === "へ" || verif_before === "に")
    ) {
        stem = verb_adji.replace(/[っ]$/g, "く");
    } else if (
        new RegExp(/[いっ]$/g).test(verb_adji) &&
        verif_after === "て" &&
        verif_before === "と"
    ) {
        stem = verb_adji.replace(/[っ]$/g, "う");
    } else if (new RegExp(/[っ]$/g).test(verb_adji)) {
        stem = verb_adji.replace(/[っ]$/g, "る");
    } else {
        stem = verb_adji + "る";
    }

    return { stem, stem2, stem3 };
}

export function splitSentencesToWords(sentences, Datum, typeOfWords) {
    let listOfwords = [];
    let indices = [];
    let blank = "";
    let sortedArr = [];
    const tokenList = [];

    /*
     * On considère qu'un mot français contient 10 lettres en moyenne.
     * We consider that a French word contained 10 characters on average.
     */
    if (
        sentences.length <= 10 &&
        !containsKanji(sentences) &&
        !containsHiragana(sentences) &&
        !containsKatakana(sentences)
    ) {
        tokenList.push(sentences);
        return tokenList;
    }

    let aSentences = [];
    if (containsPunctuation(sentences)) {
        aSentences = sentences.split("。");
    } else {
        aSentences = [sentences];
    }

    let dataType = [];
    let j = 0,
        k = 0;
    let left = [];

    for (let s of aSentences) {
        if (s.length === 0) {
            continue;
        }
        let tmp = s;
        for (let d of Datum) {
            let workVar = null;
            let regex = new RegExp(d, "g");
            while ((workVar = regex.exec(s)) !== null) {
                console.log(
                    `${d} => Found ${workVar[0]}. Next starts at ${regex.lastIndex}.`
                );

                if (containsKatakana(d)) {
                    if (s[regex.lastIndex] === "ー") {
                        d = d.replace(d[d.length - 1], "");
                    }
                }

                indices.push(regex.lastIndex - 1);
                dataType.push(typeOfWords[j]);
                for (let i = 0; i < d.length; i++) {
                    blank = blank + "*";
                }
                listOfwords.push(d);
                s = s.replace(d, blank);
                blank = "";
            }
            ++j;
        }

        if (
            indices.length !== 0 ||
            listOfwords.length !== 0 ||
            dataType.length !== 0
        ) {
            sortedArr.push(triFusion(indices, listOfwords, dataType));
            listOfwords = [];
            indices = [];
            dataType = [];
        }
        j = 0;
        ++k;
        left.push(s);
    }
    console.log(sortedArr);

    let verbify = {};
    for (let i = 0; i < sortedArr.length; ++i) {
        verbify = verbFixing(sortedArr[i].merged2, sortedArr[i].merged3);
        console.log(`VERBIFY: ${verbify.tokens[1]}`);
        sortedArr[i].merged2 = verbify.tokens;
        sortedArr[i].merged3 = verbify.types;
    }

    /*  for (let i = 0; i < sortedArr.length; ++i) {
        sortedArr[i].merged2 = refineToken(
            i,
            left,
            sortedArr[i].merged,
            sortedArr[i].merged2
        );
    }

    for (let i = 0; i < sortedArr.length; ++i) {
        let out = cleaningAuxi(sortedArr[i].merged2, sortedArr[i].merged3);
        sortedArr[i].merged2 = out.tokens;
        sortedArr[i].merged3 = out.types;
    }*/

    for (let sa of sortedArr) {
        for (let lm of sa.merged2) {
            tokenList.push(lm);
        }
    }
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(sortedArr);
    return tokenList;
}

function triFusion(arr, arr2, arr3) {
    if (arr.length <= 1 || arr2.length <= 1 || arr3.length <= 1) {
        return { merged: arr, merged2: arr2, merged3: arr3 };
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    const left2 = arr2.slice(0, middle);
    const right2 = arr2.slice(middle);
    const left3 = arr3.slice(0, middle);
    const right3 = arr3.slice(middle);

    const sortedLeft = triFusion(left, left2, left3);
    const sortedRight = triFusion(right, right2, right3);

    const merged = merge(
        sortedLeft.merged,
        sortedRight.merged,
        sortedLeft.merged2,
        sortedRight.merged2,
        sortedLeft.merged3,
        sortedRight.merged3
    );

    return merged;
}

function merge(left, right, left2, right2, left3, right3) {
    const merged = [];
    const merged2 = [];
    const merged3 = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            merged.push(left[leftIndex]);
            merged2.push(left2[leftIndex]);
            merged3.push(left3[leftIndex]);
            leftIndex++;
        } else {
            merged.push(right[rightIndex]);
            merged2.push(right2[rightIndex]);
            merged3.push(right3[rightIndex]);
            rightIndex++;
        }
    }

    while (leftIndex < left.length) {
        merged.push(left[leftIndex]);
        merged2.push(left2[leftIndex]);
        merged3.push(left3[leftIndex]);
        leftIndex++;
    }

    while (rightIndex < right.length) {
        merged.push(right[rightIndex]);
        merged2.push(right2[rightIndex]);
        merged3.push(right3[rightIndex]);
        rightIndex++;
    }

    return { merged: merged, merged2: merged2, merged3: merged3 };
}

class CommetaryTree {
    constructor(root) {
        this._root = root;
        this._leaves = [];
        this._visited = false;
    }

    get root() {
        return this._root;
    }

    set root(value) {
        this._root = value;
    }

    get leaves() {
        return this._leaves;
    }

    get visited() {
        return this._visited;
    }

    set visited(value) {
        this._visited = value;
    }

    leaf(i) {
        return this._leaves[i];
    }

    addLeaf(leaf) {
        this._leaves.push(leaf);
    }
}

function toSortCommentaryByTree(commentary, replies, tree) {
    if (
        tree !== null &&
        tree !== undefined &&
        tree.visited == false &&
        commentary !== undefined &&
        replies !== undefined &&
        replies.length > 0
    ) {
        for (let i = 0; i < replies.length; ++i) {
            if (commentary.commentaryId === replies[i].reply) {
                tree.addLeaf(new CommetaryTree(replies[i]));
                for (let j = 0; j < tree.leaves.length; ++j) {
                    toSortCommentaryByTree(replies[i], replies, tree.leaf(j));
                    tree.visited = true;
                }
            }
        }
        return tree;
    }
    return null;
}

//Depth-first search
function dfs(tree, sorted) {
    if (tree != undefined) {
        sorted.push(tree.root);
        if (tree.leaves != undefined && tree.leaves.length > 0) {
            for (let i = 0; i < tree.leaves.length; ++i) {
                sorted = dfs(tree.leaf(i), sorted);
            }
        }
    }
    return sorted;
}

export function dfsFirst(commentary, replies) {
    const sorted = [];
    return dfs(
        toSortCommentaryByTree(
            commentary,
            replies,
            new CommetaryTree(commentary)
        ),
        sorted
    );
}

export const cryptageData = (data) => {
    if (data === null) {
        return "";
    }
    return CryptoJS.AES.encrypt(data, process.env.APP_KEY).toString();
};

export const decryptageData = (encryptedData) => {
    if (encryptedData === null) {
        return "";
    }
    var bytes = CryptoJS.AES.decrypt(encryptedData, process.env.APP_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

const cut_add_stem = (tokens, types, stem_left, stem_right, i) => {
    let firstHalf = tokens.slice(0, i);
    let secondHalf = tokens.slice(i + 1);
    firstHalf.push(stem_left);
    firstHalf.push(stem_right);
    firstHalf.push(...secondHalf);
    tokens = firstHalf;
    firstHalf = types.slice(0, i);
    secondHalf = types.slice(i + 1);
    firstHalf.push("verb_stem");
    firstHalf.push("verb_stem");
    firstHalf.push(...secondHalf);
    return { tokens, types: firstHalf };
};

const verbFixing = (tokens, types) => {
    let k = 0;
    for (let i = 0; i < types.length; ++i) {
        if (
            types[i] === "particle" &&
            (types[i + 1] === "auxilliary" || types[i + 1] === "aux_stem") &&
            types[i - 1] === "particle"
        ) {
            types[i] = "verb_stem";
            let stems = whatStemIsIt(
                tokens[i],
                tokens[i - 1],
                tokens[i + 1],
                true
            );
            tokens[i] = stems.stem;
            if (stems.stem2) {
                let cutted = cut_add_stem(
                    tokens,
                    types,
                    stems.stem,
                    stems.stem2,
                    i
                );
                types = cutted.types;
                tokens = cutted.tokens;
            }
            if (stems.stem3) {
                let cutted = cut_add_stem(
                    tokens,
                    types,
                    stems.stem2,
                    stems.stem3,
                    i
                );
                types = cutted.types;
                tokens = cutted.tokens;
            }
        } else if (
            types[i] === "particle" &&
            tokens[i + 1] === "て" &&
            (types[i + 1] === "particle" || types[i + 2] === "verb_stem")
        ) {
            types[i] = "verb_stem";
            let stems = whatStemIsIt(
                tokens[i],
                tokens[i - 1],
                tokens[i + 1],
                true
            );
            tokens[i] = stems.stem;
            if (stems.stem2) {
                let cutted = cut_add_stem(
                    tokens,
                    types,
                    stems.stem,
                    stems.stem2,
                    i
                );
                types = cutted.types;
                tokens = cutted.tokens;
                i++;
            }
            if (stems.stem3) {
                let cutted = cut_add_stem(
                    tokens,
                    types,
                    stems.stem2,
                    stems.stem3,
                    i
                );
                types = cutted.types;
                tokens = cutted.tokens;
                i++;
            }
        } else if (
            types[i] === "noun" &&
            (types[i + 1] === "auxilliary" || types[i + 1] === "aux_stem") &&
            (tokens[i + 1] !== "だ" || tokens[i + 1] !== "です")
        ) {
            types[i] = "verb_stem";
            let stems = whatStemIsIt(
                tokens[i],
                tokens[i - 1],
                tokens[i + 1],
                true
            );
            tokens[i] = stems.stem;
            if (stems.stem2) {
                let cutted = cut_add_stem(
                    tokens,
                    types,
                    stems.stem,
                    stems.stem2,
                    i
                );
                types = cutted.types;
                tokens = cutted.tokens;
                ++i;
            }
            if (stems.stem3) {
                let cutted = cut_add_stem(
                    tokens,
                    types,
                    stems.stem2,
                    stems.stem3,
                    i
                );
                types = cutted.types;
                tokens = cutted.tokens;
                ++i;
            }
        } else if (
            types[i] === "auxilliary" &&
            (types[i + 1] === "auxilliary" || types[i + 1] === "aux_stem")
        ) {
            types[i] = "verb_stem";
            let stems = whatStemIsIt(
                tokens[i],
                tokens[i - 1],
                tokens[i + 1],
                true
            );
            tokens[i] = stems.stem;
            if (stems.stem2) {
                let cutted = cut_add_stem(
                    tokens,
                    types,
                    stems.stem,
                    stems.stem2,
                    i
                );
                types = cutted.types;
                tokens = cutted.tokens;
                ++i;
            }
            if (stems.stem3) {
                let cutted = cut_add_stem(
                    tokens,
                    types,
                    stems.stem2,
                    stems.stem3,
                    i
                );
                types = cutted.types;
                tokens = cutted.tokens;
                ++i;
            }
        } else if (types[i] === "noun" && types[i + 1] === "verb_stem") {
            types[i] = "adji_stem";
            let stems = whatStemIsIt(
                tokens[i],
                tokens[i - 1],
                tokens[i + 1],
                false
            );
            tokens[i] = stems.stem;
        } else if (types[i] === "verb_stem" && types[i + 1] === "verb_stem") {
            let romaji = convertHiraganaToRomanji(tokens[i]);
            console.log("ROMAJI: " + romaji);
            if (
                romaji[romaji.length - 1] !== "i" ||
                romaji[romaji.length - 1] !== "e"
            ) {
                console.log("youhou!!");
                types[i] = "undefined";
                console.log(`TOKeN: ${tokens[i]}`);
            } else {
                console.log(tokens[i]);
                let stems = whatStemIsIt(
                    tokens[i],
                    tokens[i - 1],
                    tokens[i + 1],
                    true
                );
                console.log(`STEM: ${stems.stem}`);
                tokens[i] = stems.stem;
                if (stems.stem2) {
                    let cutted = cut_add_stem(
                        tokens,
                        types,
                        stems.stem,
                        stems.stem2,
                        i
                    );
                    types = cutted.types;
                    tokens = cutted.tokens;
                    ++i;
                }
                if (stems.stem3) {
                    let cutted = cut_add_stem(
                        tokens,
                        types,
                        stems.stem2,
                        stems.stem3,
                        i
                    );
                    types = cutted.types;
                    tokens = cutted.tokens;
                    ++i;
                }
            }
        } else if (types[i] === "verb_stem" || types[i] === "aux_stem") {
            console.log(tokens[i]);
            let stems = whatStemIsIt(
                tokens[i],
                tokens[i - 1],
                tokens[i + 1],
                true
            );
            console.log(`STEM: ${stems.stem}`);
            tokens[i] = stems.stem;
            if (stems.stem2) {
                let cutted = cut_add_stem(
                    tokens,
                    types,
                    stems.stem,
                    stems.stem2,
                    i
                );
                types = cutted.types;
                tokens = cutted.tokens;
                ++i;
            }
            if (stems.stem3) {
                let cutted = cut_add_stem(
                    tokens,
                    types,
                    stems.stem2,
                    stems.stem3,
                    i
                );
                types = cutted.types;
                tokens = cutted.tokens;
                ++i;
            }
        } else if (types[i] === "adji_stem") {
            tokens[i] = whatStemIsIt(tokens[i], null, false).stem;
        }
    }
    console.log(`conjugogo : ${tokens[k]}`);
    return { tokens, types };
};

const refineToken = (i, left, indices, tokens) => {
    for (let p = 0; p < tokens.length; ++p) {
        if (new RegExp(/^(.{1}する)/g).test(tokens[p])) {
            tokens.push(tokens[p].slice(1, tokens[p].length));
            tokens[p] = left[i][indices[p] - tokens[p].length] + tokens[p][0];
        }
        ++p;
    }
    return tokens;
};

const cleaningAuxi = (tokens, types) => {
    console.log(tokens.length);
    console.log(types.length);
    for (let i = 0; i < types.length; i++) {
        if (types[i] === "auxilliary" || types[i] === "aux_stem") {
            console.log(tokens[i]);
            tokens = tokens.filter((item) => item !== tokens[i]);
            types = types.filter((item) => item !== types[i]);
        }

        if (types[i] === "verb_stem" && tokens[i + 1] === "て") {
            tokens = tokens.filter((item) => item !== tokens[i + i]);
            types = types.filter((item) => item !== types[i + i]);
        }
    }
    return { tokens, types };
};

export function wordContainsSuru(verb_adji) {
    if (new RegExp(/.*(する)$/g).test(verb_adji)) {
        return "irregular";
    }
    return "regular";
}
