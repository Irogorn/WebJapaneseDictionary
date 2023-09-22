import {describe, expect, test} from '@jest/globals';
import {whatStemIsIt} from '../tools/tools.js';

//node --experimental-vm-modules node_modules/jest/bin/jest.js
//(verb_adji, verif = null, verb = false)

describe('tools',()=>{
    test('whatStemIsIt',()=> {
        const result = whatStemIsIt('訳さ',null,'せる',true);
        expect(result).toEqual({ stem: '訳す', stem2: '', stem3: '' });
        
    })
    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('いっ',null,'て',true)).toEqual({ stem: 'いる', stem2: '', stem3: '' });
    })
    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('し',null,'て',true)).toEqual({ stem: 'する', stem2: '', stem3: '' });
    })

    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('し',null,'まし',true)).toEqual({ stem: 'する', stem2: '', stem3: '' });
    })

    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('なっ',null,'て',true)).toEqual({ stem: 'なる', stem2: '', stem3: '' });
    })
    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('いっ','に','て',true)).toEqual({ stem: 'いく', stem2: '', stem3: '' });
    })

    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('いっ','と','て',true)).toEqual({ stem: 'いう', stem2: '', stem3: '' });
    })

    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('運ん','','',true)).toEqual({ stem: '運ぬ', stem2: '運む', stem3: '運ぶ' });
    })
    
    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('打ち上げ','','',true)).toEqual({ stem: '打ち上げる', stem2: '', stem3: '' });
    })

    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('見','','ます',true)).toEqual({ stem: 'みる', stem2: '', stem3: '' });
    })

    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('見','','て',true)).toEqual({ stem: 'みる', stem2: '', stem3: '' });
    })

    test('whatStemIsIt',()=> {
        expect(whatStemIsIt('来','','ます',true)).toEqual({ stem: 'くる', stem2: '', stem3: '' });
    })

})