import React from 'react'
import styles from './Error.module.css'

export default function Error({touched,errors}) {
    return (
        <p className={styles.p}>
            {touched && errors ? `${errors}` : ""}
        </p>       
    )
}
