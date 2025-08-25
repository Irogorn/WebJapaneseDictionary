'use client'
import React from 'react'
import styles from './Conjugation.module.css'
import {irregularVerb} from '../tools/tools.js'

export default function Form(props) {
    const handleClose = ()=>{
        props.close(false);
    }
    return (
    <>
        <div className={styles.behind_modal}/>
        <div className={styles.modal}>
            <button className={styles.button} onClick={handleClose}>X</button>
            {props.verb !== undefined && <table>
                <thead>
                    <tr><th className={styles.header} colSpan="3">{props.verb.dan}</th></tr>
                    <tr><th></th><th className={styles.left}>Affirmative</th><th className={styles.right}>Negative</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>présent neutre</td><td>{irregularVerb(props.verb.stem_hi,props.root.composed) && props.root.root}{props.verb.stem_hi === "" ? 'る' : props.verb.stem_hi }</td><td>{irregularVerb(props.verb.stem_hi,props.root.composed) && props.root.root}{props.verb.n_pr_hi}</td>
                    </tr>
                    <tr className={styles.impair}>
                        <td>présent poli</td><td>{irregularVerb(props.verb.stem_hi,props.root.composed) && props.root.root}{props.verb.for_pr_hi}</td><td>{irregularVerb(props.verb.stem_hi,props.root.composed) && props.root.root}{props.verb.for_n_pr_hi}</td>
                    </tr>
                    <tr>
                        <td>passé neutre</td><td>{irregularVerb(props.verb.stem_hi,props.root.composed) && props.root.root}{props.verb.pa_hi}</td><td>{irregularVerb(props.verb.stem_hi,props.root.composed) && props.root.root}{props.verb.n_pa_hi}</td>
                    </tr>
                    <tr className={styles.impair}>
                        <td>passé poli</td><td>{irregularVerb(props.verb.stem_hi,props.root.composed) && props.root.root}{props.verb.for_pa_hi}</td><td>{irregularVerb(props.verb.stem_hi,props.root.composed) && props.root.root}{props.verb.for_n_pa_hi}</td>
                    </tr>
                    <tr>
                        <td>forme te</td><td>{irregularVerb(props.verb.stem_hi,props.root.composed) && props.root.root}{props.verb.te_hi}</td><td>{irregularVerb(props.verb.stem_hi,props.root.composed) && props.root.root}{props.verb.n_te_hi}</td>
                    </tr>
                </tbody>
            </table>}
            {props.adj !== undefined && <table>
                <thead>
                    <tr><th className={styles.header} colSpan="3">adjectif en {props.adj.type}</th></tr>
                    <tr><th></th><th className={styles.left}>affirmatif</th><th className={styles.right}>négatif</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>présent neutre</td><td>{props.adj.type === "i" ? props.root.root+'い':props.root.root}</td><td>{props.root.root}{props.adj.n_pr_hi}</td>
                    </tr>
                    <tr className={styles.impair}>
                        <td>présent poli</td><td>{props.root.root}{props.adj.for_pr_hi}</td><td>{props.root.root}{props.adj.for_n_pr_hi}</td>
                    </tr>
                    <tr>
                        <td>passé neutre</td><td>{props.root.root}{props.adj.pa_hi}</td><td>{props.root.root}{props.adj.n_pa_hi}</td>
                    </tr>
                    <tr className={styles.impair}>
                        <td>passé poli</td><td>{props.root.root}{props.adj.for_pa_hi}</td><td>{props.root.root}{props.adj.for_n_pa_hi}</td>
                    </tr>
                    <tr>
                        <td>forme te</td><td>{props.root.root}{props.adj.te_hi}</td><td>{props.root.root}{props.adj.n_te_hi}</td>
                    </tr>
                </tbody>
            </table>}
        </div> 
    </>
        
    )
}
