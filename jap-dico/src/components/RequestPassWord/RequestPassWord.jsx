import React, {useState} from 'react'
import styles from './RequestPassWord.module.css'
import { useTranslation } from "react-i18next";
import { useMediaQuery } from 'react-responsive'
import { Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import Error from '../Error/Error';
import axios from "axios";

export default function RequestPassword(props) {
    const isSmartPhone = useMediaQuery({ query: '(max-width: 500px)' })
    const { t } = useTranslation();
    const [wait,setWait] = useState(true);
    const [data,setData] = useState({});
    const handleClose = ()=>{
        props.close(false);
    }

    const handleSend = (values) =>{
        const user = {
            eMail: values.email,
        }

        axios.post(`/request_alter_password`,user).then((response)=> {
                                                        setData(response.data);
                                                        setWait(data.response);
                                                    })
                                                    .catch((error) => console.log(error));
    }

    const loginSchema = yup.object({
        email: yup
            .string(t('mailIsString'))
            .email(t('badFormatMail'))
            .required(t('requiredMail'))
    })

    return (
    <>
        <div className={styles.behind_modal}/>
        <div className={isSmartPhone === true ? styles.modalAdapt : styles.modal}>
            <div className={styles.firstline}>
                <div className={styles.title}>Demande d'un nouveau mot de passe :</div>
                <button className={styles.button} onClick={handleClose}>X</button>
            </div>
            
            {wait  ? <Formik initialValues={{email: ''}}
                    validationSchema={loginSchema}
                    onSubmit={handleSend}>
                        {({touched,errors}) => (
                            <Form>
                                <div className={isSmartPhone === false ? styles.line : styles.lineAdapt}>
                                    <label className={styles.label}>{t('email')}: </label>
                                    <Field name="email"/>
                                    <Error touched={touched.email} errors={errors.email}/>
                                </div>
                                <div className={styles.fourthline}>
                                    <button className={styles.send} type="submit">{t('send')}</button> 
                                </div>
                            </Form>
                        )}
            </Formik>  :
            <p className={styles.caution} >{t('caution',{time: data.dateValiditee})}</p>}    
        </div> 
    </>
    )
}
