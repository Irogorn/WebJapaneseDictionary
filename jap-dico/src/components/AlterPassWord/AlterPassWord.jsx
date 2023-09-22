import React, {useState,useEffect,useContext} from 'react'
import { Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import Error from '../Error/Error';
import {useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from './AlterPassWord.module.css';
import { useMediaQuery } from 'react-responsive'
import axios from "axios";
import { UserContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

export default function AlterPassWord() {
    const {token} = useParams();
    const [user,setUser] = useState({});
    const { t } = useTranslation();
    const {setSelected} = useContext(UserContext)
    const navigation = useNavigate();


    useEffect(
        ()=>{
            axios.get(`/resquet_new_password/${token}`).then((result)=>{setUser(result.data)}).catch((err)=>{console.log(err)});

        return ()=>{}},
        [token]);

    const alterSchema = yup.object({
        password: yup
            .string(t('passwordIsString'))
            .required(t('requiredPassword'))
            .min(8, t('minimumPassword')),
        confirmPassword: yup
            .string(t('confirmedPasswordIsString'))
            .oneOf([yup.ref("password"),null],t('passwordMusstMatch'))
            .required(t('required'))
    });

    const isSmartPhone = useMediaQuery({ query: '(max-width: 500px)' })

    const handleSubmit = (values) => {
            const u = { ...user,passWord: values.password}
            axios.patch(`/updateAlterPassWord`,u).then((response)=> {}).catch((error) => console.log(error));
            navigation('/login')
            setSelected(2)
    }

    return (
        <>
            { user ? <Formik initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={alterSchema}
                    onSubmit={handleSubmit}>
                        {({touched,errors}) => (
                            <Form className={styles.ilot}>
                                <div className={isSmartPhone === false ? styles.line : styles.lineAdapt}>
                                    <label className={styles.label}>{t('password')}: </label>
                                    <Field type="password" name="password"/>
                                    <Error touched={touched.password} errors={errors.password}/>
                                </div>
                                <div className={isSmartPhone === false ? styles.line : styles.lineAdapt}>
                                    <label className={styles.label}>{t('passwordconfirmed')}: </label>
                                    <Field type="password" name="confirmPassword"/>
                                    <Error touched={touched.confirmPassword} errors={errors.confirmPassword}/>
                                </div>
                                <div className={styles.groupButton}>
                                    <input type="submit" value={t('validate')} className={styles.button}/>
                                </div>
                            </Form>  )}
            </Formik> : <div className={styles.center}><p className={styles.caution}>The token is no longer valid !</p></div> }
        </>   
    )
}
