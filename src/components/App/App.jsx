import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext, themes } from 'context/themeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import * as storage from 'services/localStorage';
import image from 'images/image.jpg';
import s from './App.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import Container from 'components/common/Container/Container';
import ThemeSwitcher from 'components/common/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from 'components/common/LanguageSwitcher/LanguageSwitcher';

const THEME_STORAGE_KEY = 'theme';

const App = () => {
  const contacts = useSelector(state => state.contacts.items);

  const [theme, setTheme] = useState(
    () => storage.get(THEME_STORAGE_KEY) ?? themes.light,
  );

  const toggleTheme = () =>
    setTheme(prevTheme =>
      prevTheme === themes.light ? themes.dark : themes.light,
    );

  useEffect(() => {
    storage.save(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const { t } = useTranslation();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === themes.light ? s.lightTheme : s.darkTheme}>
        <div className={s.lanquagesWrapper}>
          <LanguageSwitcher />
        </div>
        <Container>
          <ThemeSwitcher />
          <img className={s.image} src={image} alt="Woman" />
          <div className={s.contantWrap}>
            <h1 className={s.title}>{t('app.title')}</h1>
            <div className={s.wrap}>
              <ContactForm />
            </div>
            <h2 className={s.subtitle}>{t('app.subtitle')}</h2>
            {contacts.length > 1 && <Filter />}
            {!contacts.length && <span>{t('app.message')}</span>}
            <ContactList />
          </div>
        </Container>
      </div>
      <ToastContainer autoClose={5000} />
    </ThemeContext.Provider>
  );
};

export default App;
