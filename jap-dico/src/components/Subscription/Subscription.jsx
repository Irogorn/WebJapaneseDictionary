import axios from "axios";
import React, {useContext, useState, useEffect} from "react";
import styles from "./Subscription.module.css"
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import { UserContext } from "../Context/Context";
import Error from '../Error/Error'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from "react-i18next";
import { readable } from "../../tools/tools";

export default function Subscription(){
    const navigation = useNavigate();
    const {setSelected} = useContext(UserContext)
    const { t } = useTranslation();
    const [EmList,setemList] = useState([])
    const [UnList,setunList] = useState([])

    useEffect(
        ()=>{
            axios.get(`/user_mails`).then((result)=>{setemList(result.data);}).catch((err)=>{console.log(err)});
            axios.get(`/user_names`).then((result)=>{setunList(result.data);}).catch((err)=>{console.log(err)});
            setSelected(3)
                        return ()=>{}},
                        [setSelected]);

    const loginSchema = yup.object({
        username: yup
            .string(t('usernameIsString'))
            .notOneOf(readable(UnList),t('alreadyTakenUsername'))
            .required(t('requiredUsername'))
            .min(4, t('minimumUsername')),
        email: yup
            .string(t('mailIsString'))
            .email(t('badFormatMail'))
            .notOneOf(readable(EmList),t('alreadyTakenMail'))
            .required(t('requiredMail')),
        password: yup
            .string(t('passwordIsString'))
            .required(t('requiredPassword'))
            .min(8, t('minimumPassword')),
        confirmPassword: yup
            .string(t('confirmedPasswordIsString'))
            .oneOf([yup.ref("password"),null],t('passwordMusstMatch'))
            .required(t('required'))
    })

    

    const isSmartPhone = useMediaQuery({ query: '(max-width: 500px)' })

    const handleSubmit = (values) => {
            const user = {
                userName: values.username,
                firstName: "",
                lastName: "",
                eMail: values.email,
                emailConfirmed: false,
                passWord: values.password
            }
            axios.post(`/subscribe`,user).then((response)=> {}).catch((error) => console.log(error));
            navigation('/login')
            setSelected(2)
    }

    return(
        <div className={isSmartPhone === false ? styles.contour : styles.contourAdapt}>
            <Formik initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}>
                        {({touched,errors}) => (
                            <Form className={styles.ilot}>
                                <div className={isSmartPhone === true ? styles.lineAdapt : styles.line}>
                                    <label className={styles.label}>{t('username')}:</label>
                                    <Field name="username"/>
                                    <Error touched={touched.username} errors={errors.username}/>  
                                </div>
                                <div className={isSmartPhone === false ? styles.line : styles.lineAdapt}>
                                    <label className={styles.label}>{t('email')}: </label>
                                    <Field name="email"/>
                                    <Error touched={touched.email} errors={errors.email}/>
                                </div>
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
                                    <input type="button" value={t('cancel')} className={styles.button} onClick={()=>{setSelected(1); navigation('/')}}/>
                                </div>
                            </Form>  )}
            </Formik> 
        </div>   
    );
}