import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locales, locale: activeLocale, pathname, query, asPath } = router;

  const handleLocaleChange = (nextLocale) => {
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  const availableLocales = locales.filter((locale) => locale !== 'default');

  return (
    <div>
      {availableLocales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          style={{
            fontWeight: activeLocale === locale ? 'bold' : 'normal',
            margin: '0 5px',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;