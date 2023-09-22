import BaseModel from "../../lib/base-model.js";
import { Op } from "sequelize";
import {
    detailledString,
    containsKanji,
    splitSentencesToWords,
    wordContainsSuru,
} from "../../tools/tools.js";

async function uniqueSearch(BaseModel, lookedup, word) {
    let askedDefinition = [];
    const setkanji = new Set();
    console.log(`Word: ${word}`);
    lookedup = await BaseModel.listPointer["words"].findAll({
        include: [
            { model: BaseModel.WordsFR, where: { french: word } },
            { model: BaseModel.Commentary },
        ],
    });

    if (lookedup.length === 0) {
        lookedup = await BaseModel.listPointer["words"].findAll({
            include: [
                { model: BaseModel.WordsFR },
                { model: BaseModel.Commentary },
            ],
            where: {
                [Op.or]: [
                    {
                        jp_romaji: {
                            [Op.like]: word,
                        },
                    },
                    {
                        jp_hiragana: {
                            [Op.like]: word,
                        },
                    },
                    {
                        jp_katakana: {
                            [Op.like]: word,
                        },
                    },
                    {
                        jp_kanji: {
                            [Op.like]: word,
                        },
                    },
                ],
            },
        });
    }
    
    if (lookedup.length > 0) {
        for (let word of lookedup) {
            let tmp = {};
            tmp = { ...tmp, word };

            if (word.type) {
                if (
                    word.type === "godan" ||
                    word.type === "ichidan" ||
                    word.type == "irregular"
                ) {
                    let stem_hi = "";
                    if (word.jp_kanji.length === 0) {
                        if (word.jp_hiragana === "する") {
                            stem_hi = word.jp_hiragana;
                        } else {
                            stem_hi =
                                word.jp_hiragana[word.jp_hiragana.length - 1];
                        }
                    } else {
                        if (word.jp_kanji === "来る") {
                            stem_hi = word.jp_hiragana;
                        } else if (word.jp_kanji === "行く") {
                            stem_hi = word.jp_hiragana;
                        } else {
                            stem_hi = word.jp_kanji[word.jp_kanji.length - 1];
                        }
                    }
                    const tenseVerbs = await BaseModel.listPointer[
                        "verb"
                    ].findOne({
                        where: {
                            [Op.and]: [
                                { dan: { [Op.like]: word.type } },
                                { stem_hi: { [Op.like]: stem_hi } },
                            ],
                        },
                    });
                    tmp = { ...tmp, tenseVerbs };
                } else if (word.type == "i" || word.type == "na") {
                    const tenseAdjs = await BaseModel.listPointer[
                        "adj"
                    ].findOne({
                        where: { type: word.type },
                    });
                    tmp = { ...tmp, tenseAdjs };
                }
            }

            askedDefinition.push(tmp);

            for (let k of word.jp_kanji) {
                if (containsKanji(k)) {
                    if (k) {
                        setkanji.add(k);
                    }
                }
            }
        }
        return { found: true, askedDefinition , setkanji };
    }
    return { found: false };
}

export default class LookUpModel extends BaseModel {
    async get(word, Datum, typeOfWords) {
        let listKanji = [];
        let askedDefinition = [];
        let lookedup = {};
        const setkanji = new Set();

        const reply = await uniqueSearch(this, lookedup, word);
        if (reply.found) {
            reply.askedDefinition.forEach(elem => askedDefinition.push(elem));
            reply.setkanji.forEach(elem => setkanji.add(elem));
        }
        else {
            const setword = new Set(
                splitSentencesToWords(word, Datum, typeOfWords)
            );

            //console.log("--------------------------------------");
             console.log(setword);
            for (let token of setword) {
                const reply = await uniqueSearch(this, lookedup, token);
                console.log(`Reply: ${reply.found}`);
                if (reply.found) {
                   // askedDefinition.push(reply.askedDefinition);
                    reply.askedDefinition.forEach(elem => askedDefinition.push(elem));
                    reply.setkanji.forEach(elem => setkanji.add(elem));
                } else {
                    let obj = detailledString(token);
                    // console.log(obj);

                    if (
                        obj.jp_romaji !== undefined &&
                        obj.jp_hiragana !== undefined &&
                        obj.jp_kanji !== undefined
                    ) {
                        lookedup = await this.listPointer["words"].findAll({
                            include: [
                                { model: this.WordsFR },
                                { model: this.Commentary },
                            ],
                            where: {
                                [Op.and]: [
                                    {
                                        jp_romaji: {
                                            [Op.like]: obj.jp_romaji,
                                        },
                                    },
                                    {
                                        jp_hiragana: {
                                            [Op.like]: obj.jp_hiragana,
                                        },
                                    },
                                    {
                                        jp_kanji: {
                                            [Op.like]: obj.jp_kanji,
                                        },
                                    },
                                ],
                            },
                        });
                        //console.log("level 1");
                    } else if (
                        obj.jp_romaji !== undefined &&
                        obj.jp_hiragana !== undefined
                    ) {
                        lookedup = await this.listPointer["words"].findAll({
                            include: [
                                { model: this.WordsFR },
                                { model: this.Commentary },
                            ],
                            where: {
                                [Op.and]: [
                                    {
                                        jp_romaji: {
                                            [Op.like]: obj.jp_romaji,
                                        },
                                    },
                                    {
                                        jp_hiragana: {
                                            [Op.like]: obj.jp_hiragana,
                                        },
                                    },
                                ],
                            },
                        });
                        // console.log("level 2");
                    } else if (
                        obj.jp_romaji !== undefined &&
                        obj.jp_kanji !== undefined
                    ) {
                        lookedup = await this.listPointer["words"].findAll({
                            include: [
                                { model: this.WordsFR },
                                { model: this.Commentary },
                            ],
                            where: {
                                [Op.and]: [
                                    {
                                        jp_romaji: {
                                            [Op.like]: obj.jp_romaji,
                                        },
                                    },
                                    {
                                        jp_kanji: {
                                            [Op.like]: obj.jp_kanji,
                                        },
                                    },
                                ],
                            },
                        });
                        //  console.log("level 3");
                    } else if (
                        obj.jp_hiragana !== undefined &&
                        obj.jp_kanji !== undefined
                    ) {
                        lookedup = await this.listPointer["words"].findAll({
                            include: [
                                { model: this.WordsFR },
                                { model: this.Commentary },
                            ],
                            where: {
                                [Op.and]: [
                                    {
                                        jp_hiragana: {
                                            [Op.like]: obj.jp_hiragana,
                                        },
                                    },
                                    {
                                        jp_kanji: {
                                            [Op.like]: obj.jp_kanji,
                                        },
                                    },
                                ],
                            },
                        });
                        //  console.log("level 4");
                    } else if (
                        obj.jp_romaji !== undefined ||
                        obj.jp_hiragana !== undefined ||
                        obj.jp_kanji !== undefined
                    ) {
                        // console.log(obj);
                        lookedup = await this.listPointer["words"].findAll({
                            include: [
                                { model: this.WordsFR },
                                { model: this.Commentary },
                            ],
                            where: obj,
                        });
                        // console.log(lookedup);
                        // console.log("level 5");
                        if (lookedup.length === 0 && obj.jp_romaji) {
                            let w = obj.jp_romaji;
                            lookedup = await this.listPointer["words"].findAll({
                                include: [
                                    {
                                        model: this.WordsFR,
                                        where: { french: w },
                                    },
                                    { model: this.Commentary },
                                ],
                            });
                            // console.log("level 6");
                        }
                    }
                    //console.log(lookedup);
                    for (let word of lookedup) {
                        //   console.log(word);
                        let tmp = {};
                        tmp = { ...tmp, word };

                        if (word.type) {
                            if (
                                word.type === "godan" ||
                                word.type === "ichidan" ||
                                word.type == "irregular"
                            ) {
                                let stem_hi = "";
                                if (word.jp_kanji.length === 0) {
                                    if (word.jp_hiragana === "する") {
                                        stem_hi = word.jp_hiragana;
                                    } else {
                                        stem_hi =
                                            word.jp_hiragana[
                                                word.jp_hiragana.length - 1
                                            ];
                                    }
                                } else if (
                                    wordContainsSuru(word.jp_kanji) ==
                                    "irregular"
                                ) {
                                    stem_hi = "する";
                                } else {
                                    if (word.jp_kanji === "来る") {
                                        stem_hi = word.jp_hiragana;
                                    } else if (word.jp_kanji === "行く") {
                                        stem_hi = word.jp_hiragana;
                                    } else {
                                        stem_hi = word.jp_kanji[word.jp_kanji.length - 1];
                                    }
                                }
                                const tenseVerbs = await this.listPointer[
                                    "verb"
                                ].findOne({
                                    where: {
                                        [Op.and]: [
                                            { dan: { [Op.like]: word.type } },
                                            { stem_hi: { [Op.like]: stem_hi } },
                                        ],
                                    },
                                });
                                tmp = { ...tmp, tenseVerbs };
                            } else if (word.type == "i" || word.type == "na") {
                                const tenseAdjs = await this.listPointer[
                                    "adj"
                                ].findOne({
                                    where: { type: word.type },
                                });
                                tmp = { ...tmp, tenseAdjs };
                            }
                        }
                        // console.log(tmp);
                        askedDefinition.push(tmp);

                        for (let k of word.jp_kanji) {
                            if (containsKanji(k)) {
                                if (k) {
                                    setkanji.add(k);
                                }
                            }
                        }
                    }
                    lookedup = [];
                }
            }
        }

        let tmp2 = {};
        for (let k of setkanji) {
            const kanji = await this.listPointer["kanjis"].findOne({
                include: this.KanjisFR,
                where: { kanji: k },
            });
            tmp2 = { ...tmp2, kanji };
            listKanji.push(tmp2);
        }

        return [askedDefinition, listKanji];
    }
}
