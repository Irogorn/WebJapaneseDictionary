import React,{useContext,useEffect,useState} from 'react';
import { Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import axios from "axios";
import styles from "./Account.module.css"
import { UserContext } from "../Context/Context";
import Error from '../Error/Error'
import { useNavigate } from "react-router-dom";
import {isExpired } from "react-jwt";
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from "react-i18next";
import { readable } from '../../tools/tools';


const Account = () => {
    //const { t, i18n } = useTranslation();
    const {t} = useTranslation();
    const {setGranted, granted,setSelected} = useContext(UserContext)
    const navigation = useNavigate();
    const toclose = isExpired(localStorage.getItem("token"));
    setSelected(2);
    const isSmartPhone = useMediaQuery({ query: '(max-width: 500px)' })
    const [user,setUser] = useState({})
    const [EmList,setemList] = useState([])
    const [UnList,setunList] = useState([])

    useEffect(
        ()=>{
            axios.get(`/user`,{
                                    headers:{
                                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                                    }
                                }).then((result)=>{setUser(result.data);}).catch((err)=>{console.log(err)});
                        return ()=>{}},
                        []);

    useEffect(
        ()=>{
            axios.get(`/user_mail`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((result)=>{setemList(result.data);}).catch((err)=>{console.log(err)});
            axios.get(`/user_name`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((result)=>{setunList(result.data);}).catch((err)=>{console.log(err)});
                        return ()=>{}},
                        [EmList,UnList]);

    const updateSchema = yup.object({
        username: yup
            .string(t('usernameIsString'))
            .required(t('requiredUsername'))
            .min(4, t('minimumUsername'))
            .notOneOf(readable(UnList),t('alreadyTakenUsername')),
        email: yup
            .string(t('mailIsString'))
            .email(t('badFormatMail'))
            .required(t('requiredMail'))
            .notOneOf(readable(EmList),t('alreadyTakenMail')),
        password: yup
            .string(t('passwordIsString'))
            .min(8, t('minimumPassword')),
    })

    const handleUpDate = (values) => {
        const user = {
            userName: values.username,
            firstName: "",
            lastName: "",
            eMail: values.email,
            passWord: values.password
        }
        axios.patch(`/update`,user,{
                                        headers:{
                                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                                        }
                                    }).then((response)=> {}).catch((error) => console.log(error));
    }

    const handleDelete = () => {
        axios.delete(`/unsubscribe`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response)=> {}).catch((error) => console.log(error));
        localStorage.removeItem("token"); 
        setGranted(null);
        navigation('/login')
        setSelected(2)
    }

    useEffect(
        ()=>{
            if(toclose || granted === null)
            {
                navigation('/login')
                localStorage.removeItem('token')
                setGranted(null)
            } 
        return ()=>{}},
        [toclose,navigation,setGranted,granted]);   

    return (
        <>
            { user.userId  && <Formik enableReinitialize={true} initialValues={{ username: user.userName, email: user.eMail, password: '' }}
                    validationSchema={updateSchema}
                    onSubmit={handleUpDate}>
                {({touched,errors}) => (
                    <>
                        <div className={isSmartPhone === false ? styles.contour : styles.contourAdapt}>
                            <Form className={styles.ilot}>
                                <div className={isSmartPhone === false ? styles.line : styles.lineAdapt}>
                                <label className={styles.label}>{t('username')}:</label>
                                    <Field name="username"/>
                                    <Error touched={touched.username} errors={errors.username}/> 
                                </div>
                                
                                <div className={isSmartPhone === false ? styles.line : styles.lineAdapt}>
                                <label className={styles.label}>{t('email')}:</label>
                                    <Field type="email" name="email" placeholder="eMail"/>
                                    <Error touched={touched.email} errors={errors.email}/> 
                                </div>
                                
                                <div className={isSmartPhone === false ? styles.line : styles.lineAdapt}>
                                <label className={styles.label}>{t('newpassword')}:</label>
                                    <Field type="password" name="password" placeholder="passWord"/>
                                    <Error touched={touched.password} errors={errors.password}/> 
                                </div>

                                <div className={isSmartPhone === false ? styles.line : styles.lineAdapt}>
                                    <label className={styles.label}>{t('passwordconfirmed')}: </label>
                                    <Field type="password" name="confirmPassword" placeholder={t('passwordconfirmed')}/>
                                    <Error touched={touched.confirmPassword} errors={errors.confirmPassword}/>
                                </div>

                                <div className={styles.buttonPosition}>
                                    <button className={styles.button} type="submit">Save</button>
                                </div>
                            </Form>
                        </div>
                        <div>
                            <div className={styles.ilot2}>
                                <button className={styles.delete} onClick={handleDelete}>{t('delete')}</button>
                            </div> 
                        </div>
                    </>
                )}
            </Formik>}
        </>
        
    );
};

export default Account;