import styles from './Commentaries.module.css'
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import { UserContext } from "../Context/Context";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import {faReply} from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive'

export default function Commentaries(props) {
    const router = useRouter()
    const [commentaries, setCommentaries] = useState([])
    const [text, setText] = useState("");
    const [isSent, setIsSent] = useState(false);
    const {granted, setComToLogin} = useContext(UserContext);
    const [isExpand, setIsExpand] = useState(false);
    const { t } = useTranslation();
    const [reply,setReply] = useState(-1);
    const [replyToReply_,setReplyToReply_] = useState(-1);
    const [comId,setComId] = useState(-1);
    const [unReply,setUnReply] = useState("");

    const isSmartPhone = useMediaQuery({ query: '(max-width: 500px)' })

    useEffect(
        ()=>{
            axios.get(`/commentaries/${props.wordId}`).then((result)=>{setCommentaries(result.data)}).catch((err)=>{console.log(err)}); 
            return ()=>{}},
            [isSent,props.wordId]);

    const login = ()=>{
        setComToLogin(true)
        router.push("/login")
    }

    const dayMonth = (date) => {
        let MonthLetters = {0:t('january'), 1:t('february'), 2:t('march'), 3:t('april'), 
                            4:t('may'), 5:t('june'), 6:t('july'), 7:t('august'), 
                            8:t('september'), 9:t('october'), 10:t('november'), 
                            11:t('december')};
        let _date = new Date(date);
        return `${_date.getDate()} ${MonthLetters[_date.getMonth()]}`
    }

    const handleSubmit = (event) => {
            event.preventDefault();
            if(text.length > 0){
                const commentary = {
                    "wordId": props.wordId,
                    "commentary": text
                }
    
                const config = {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
                axios.post(`/commentary`,commentary,config).then((response)=> {setIsSent(!isSent);  })
                .catch((error) => console.log(error));  
            }
    }

    const expand = (isExand) =>{
            isExpand ? setIsExpand(false) : setIsExpand(true)
    }

    const replyTo = (i,commentary) =>{
        setComId(commentary.commentaryId);
        setUnReply(commentary.userName);
        setReply(i);
    }

    const replyToReply = (i,commentary) =>{
        setComId(commentary.commentaryId);
        setUnReply(commentary.user_name_reply);
        setReplyToReply_(i);
    }

    const handleReply = (event) => {
        event.preventDefault();
        if(text.length > 0){
            const commentary = {
                "wordId": props.wordId,
                "commentary": text,
                "reply": comId,
                "user_name_reply": unReply
            }
    
            const config = {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            setReply(-1);
            axios.post(`/commentary`,commentary,config).then((response)=> {setIsSent(!isSent);  })
            .catch((error) => console.log(error));  
        }
}

const handleReplyToReply = (event) => {
    event.preventDefault();
    if(text.length > 0 ){
        const commentary = {
            "wordId": props.wordId,
            "commentary": text,
            "reply": comId,
            "user_name_reply": unReply
        }
    
        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        setReplyToReply_(-1);
        axios.post(`/commentary`,commentary,config).then((response)=> {setIsSent(!isSent);  })
        .catch((error) => console.log(error)); 
    }
}

    return (
                <div className={isSmartPhone ? styles.blockCommentaryAdapt : styles.blockCommentary}>
                    <form className={styles.input}  onSubmit={handleSubmit}>
                        <input className={styles.commentary} type="text" placeholder={t('placeholderCommentary')} onChange={(event)=>{setText(event.target.value)}}/>
                        {granted === null ?<button className={isSmartPhone  ? styles.buttonAdapt : styles.button} onClick={login}>
                        {isSmartPhone === true ? <FontAwesomeIcon icon={faArrowRightToBracket} /> : t('login')}
                        </button> : 
                        <button className={isSmartPhone === true ? styles.buttonAdapt : styles.button} type="submit">
                            {isSmartPhone === true ? <FontAwesomeIcon icon={faPaperPlane} /> : t('send')}
                        </button>}
                    </form>
                    <section className={!isExpand ? styles.expand : styles.collapse}>
                        <h5>{t('commentaries')}: ({commentaries.length}) </h5>
                        <button className={styles.buttonExpand} onClick={()=>{expand(isExpand)}}>
                            {isExpand ? <FontAwesomeIcon icon={faAnglesUp} />: <FontAwesomeIcon icon={faAnglesDown} />}
                        </button>
                    </section>
                    {isExpand ? <div className={styles.existingCommentaries}>
                        {   
                            commentaries.map((commentary,i) => {
                            return(
                                <>
                                    {commentary.reply === 0 &&<article key={commentary.commentaryId} className={styles.article} >
                                        {`${commentary.commentary}`}<br></br>
                                        {commentary.userId && <button className={styles.buttonReply} onClick={()=>{replyTo(i,commentary)}}>
                                            <FontAwesomeIcon icon={faReply} style={{color: 'pink'}} />
                                        </button>}
                                        <p className={styles.p}>{t('postedon')}<time dateTime={`${commentary.datePosted}`}>{dayMonth(commentary.datePosted)}</time> {t('by')} {`${commentary.userName}`}.</p>
                                    </article>}
                                    {   reply === i && 
                                            <div className={styles.closeReply}> 
                                                <button className={styles.buttonClose} onClick={()=>{setReply(-1)}}>
                                                    <FontAwesomeIcon icon={faXmark} style={{color: 'pink'}} />
                                                </button> 
                                                <form className={styles.inputReply}  onSubmit={handleReply}>
                                                    <input className={styles.commentary2} type="text" placeholder={t('placeholderCommentary')} onChange={(event)=>{setText(event.target.value)}}/>
                                                    {granted === null ?<button className={isSmartPhone === true ? styles.buttonAdapt : styles.button} onClick={login}>
                                                    {isSmartPhone === true ? <FontAwesomeIcon icon={faArrowRightToBracket} /> : t('login')}
                                                    </button> : 
                                                    <button className={isSmartPhone === true ? styles.buttonAdapt : styles.button} type="submit">
                                                        {isSmartPhone === true ? <FontAwesomeIcon icon={faPaperPlane} /> : t('send')}
                                                    </button>}
                                                </form>
                                            </div>
                                    }
                                    {commentary.reply > 0 && 
                                        <article key={commentary.commentaryId} className={styles.articleReply} >
                                            {`${commentary.commentary}`}<br></br>
                                            {commentary.userId && <button className={styles.button3} onClick={()=>{replyToReply(i,commentary)}}>
                                                <FontAwesomeIcon icon={faReply} style={{color: 'pink'}} />
                                            </button>}
                                            <p>{t('answerOn')} <time dateTime={`${commentary.datePosted}`}>{dayMonth(commentary.datePosted)}</time> {t("to")} {`${commentary.user_name_reply}`} {t('by')} {`${commentary.userName}`}.</p>
                                        </article>}
                                        {   replyToReply_ === i &&
                                            <div className={styles.closeReply}> 
                                                <button className={styles.button4} onClick={()=>{setReplyToReply_(-1)}}>
                                                    <FontAwesomeIcon icon={faXmark} style={{color: 'pink'}} />
                                                </button> 
                                                <form className={styles.input2}  onSubmit={handleReplyToReply}>     
                                                        <input className={styles.commentaryReply} type="text" placeholder={t('placeholderCommentary')} onChange={(event)=>{setText(event.target.value)}}/>
                                                        {granted === null ?<button className={isSmartPhone === true ? styles.buttonAdapt : styles.button} onClick={login}>
                                                        {isSmartPhone === true ? <FontAwesomeIcon icon={faArrowRightToBracket} /> : t('login')}
                                                        </button> : 
                                                        <button className={isSmartPhone === true ? styles.buttonAdapt : styles.button} type="submit">
                                                            {isSmartPhone === true ? <FontAwesomeIcon icon={faPaperPlane} /> : t('send')}
                                                        </button>}
                                                </form>
                                            </div>
                                        }
                                </>
                            )
                        })}
                        {false && <input  className={styles.commentary} type="text" placeholder="bla bla bla"/>}
                        {false && <input className={styles.buttonModif} type="submit" value="modif"/>}
                    </div> : ""}
                </div>
            )
}
