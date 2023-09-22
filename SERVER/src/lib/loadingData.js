import { log } from 'console';
import fs from 'fs';

const loadDataFromDatabase = async () => {
    const buffer = fs.readFileSync(process.env.PATH_DICTIONARY_JP); 
    const Datum = [];
    for (let i = 0; i < buffer.length; i += 26) {
        const str = buffer.toString('utf16le', i, i + 26).replace(/\0/g, '');
        Datum.push(str);
    }

    const buffer2 = fs.readFileSync(process.env.PATH_WORD_TYPES);
    const typeOfWords = [];
    for (let i = 0; i < buffer2.length; i += 12) {
        const str = buffer2.toString('utf8', i, i + 12).replace(/\0/g, '');
        typeOfWords.push(str);
    }

    return {Datum,typeOfWords}
};  

export default async function loadData(fastifyInstance){
    const data = await loadDataFromDatabase();
    fastifyInstance.decorate('Datum', data.Datum);
    fastifyInstance.decorate('typeOfWords', data.typeOfWords );
};