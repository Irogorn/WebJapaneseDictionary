'use client';
import React from "react";
import styles from "./Welcome.module.css";
import {useTranslations} from 'next-intl';

export default function Welcome() {
    const t = useTranslations('Welcome');
    return (
        <div className={styles.block}>
            <h1>
                {t('title')}
            </h1>
            <div>
                <div>
                    <h2 >
                        {t('subtitle')}
                    </h2>
                    <ul className={styles.list}>
                        <li>{t('feature1')}
                        </li>
                        <li>
                            {t('feature2')}
                        </li>
                        <li>
                            {t('feature3')}
                        </li>
                        <li>
                            {t('feature4')}
                        </li>
                        <li>{t('feature5')}
                        </li>
                        <li>
                            {t('feature6')}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
