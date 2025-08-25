import axios from "axios";
import React, {useContext,useState} from "react";
import styles from "./Login.module.css"
import { UserContext } from "../Context/Context";
import { useRouter } from "next/router";
import { useMediaQuery } from 'react-responsive'
import { Formik, Form, Field} from 'formik';
import Error from '../Error/Error'
import * as yup from 'yup';
import { useTranslation } from "react-i18next";
import RequestPassWord from "../RequestPassWord/RequestPassWord";

export default function Login(){
    const { t } = useTranslation();
    const {word, setGranted, comToLogin, setComToLogin, setSelected} = useContext(UserContext)
    const router = useRouter();
    const [pass,setPass] = useState(false)
    const [show,setShow] = useState(false)
    const loginSchema = yup.object({
        email: yup
            .string(t('mailIsString'))
            .email((t("badFormatMail")))
            .required(t('requiredMail')),
        password: yup
            .string(t('passwordIsString'))
            .required(t("requiredPassword"))
            .min(8,  t('minimumPassword')),
    })
    
    const isSmartPhone = useMediaQuery({ query: '(max-width: 500px)' })

    const treatmentReply= (response) =>{
        if(response.data.token){
            setGranted(response.data.token);
            localStorage.setItem("token",response.data.token)
            setSelected(1)
            if (comToLogin === false) {
                router.push('/');
            } else {
                setComToLogin(false);
                router.push(`/search/${word}`);
            }
            setPass(false)
        }
        else{
            setPass(true)
        }
    }

    const handleSubmit = (values) => {
        const user = {
            eMail: values.email,
            passWord: values.password
        }

        axios.post(`/signin`,user).then((response)=> {
                                                        treatmentReply(response)
                                                    })
                                                    .catch((error) => console.log(error));
    }

    const handleRequestPassword = () =>{
        setShow(true)
    }

    return(
        <>
            <Formik initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}>
                        {({touched,errors}) => (
                            <Form className={styles.ilot}>
                                <div className={isSmartPhone === false ? styles.line : styles.lineAdapt}>
                                    {isSmartPhone === false && <label className={styles.label}>{t('email')}:</label>}
                                    <Field className={styles.field} name="email" placeholder={isSmartPhone === false ? "" : t('email')}/> 
                                    <Error touched={touched.email} errors={errors.email}/>
                                </div>
                                <div className={isSmartPhone === false ? styles.line : styles.lineAdapt}>
                                    {isSmartPhone === false && <label className={styles.label}>{t('password')}: </label>}
                                    <Field className={styles.field} type="password" name="password" placeholder={isSmartPhone === false ? "" : t('password')}/>
                                    <Error touched={touched.password} errors={errors.password}/>
                                </div>
                                <Error touched={pass} errors={"email ou mot de passe incorrect !"}/>
                                <div className={isSmartPhone === false ? styles.groupButton : styles.groupButtonAdapt}>
                                    <input type="submit" value={t('login')} className={styles.button}/>
                                    <input type="button" value={t('return')} className={styles.button} onClick={()=>{setSelected(1); router.push('/')}}/>
                                </div>
                            </Form> 
                        )}
            </Formik>

            {show &&  <RequestPassWord close={setShow}/> }

            <div className={styles.ilot}>
                <button className={styles.link} onClick={handleRequestPassword}>{t('forgotPassword')}</button>
            </div> 
        </>
                
    );
}