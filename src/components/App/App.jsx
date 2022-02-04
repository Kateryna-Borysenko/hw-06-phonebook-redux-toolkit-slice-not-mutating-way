import { useState, useEffect } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import * as storage from 'services/localStorage';
import image from 'images/image.jpg';
import s from './App.module.css';
import Container from 'components/common/Container/Container';
import { ThemeContext, themes } from 'context/themeContext';
import ThemeSwitcher from 'components/ThemeSwitcher/ThemeSwitcher';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import LanguageSwitcher from 'components/common/LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const THEME_STORAGE_KEY = 'theme';

const App = ({ items }) => {
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
              <ContactForm contacts={items} />
            </div>
            <h2 className={s.subtitle}>{t('app.subtitle')}</h2>
            {items.length > 1 && <Filter />}
            {!items.length && <span>{t('app.message')}</span>}
            <ContactList />
          </div>
        </Container>
      </div>
      <ToastContainer autoClose={5000} />
    </ThemeContext.Provider>
  );
};

const mapStateToProps = state => ({
  items: state.contacts.items,
});

export default connect(mapStateToProps, null)(App);
