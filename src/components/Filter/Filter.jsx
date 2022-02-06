import { useEffect, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { contactsActions } from 'redux/contacts';
import { ThemeContext, themes } from 'context/themeContext';
import { useTranslation } from 'react-i18next';
import s from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const { theme } = useContext(ThemeContext);

  const inputRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return (
    <div>
      <label className={s.label}>
        <span
          className={
            theme === themes.light ? s.lightThemeTitle : s.darkThemeTitle
          }
        >
          {t('filter.message')}
        </span>
        <input
          ref={inputRef}
          className={
            theme === themes.light ? s.lightTextField : s.darkTextField
          }
          type="text"
          name="filter"
          value={filter}
          onChange={e => dispatch(contactsActions.changeFilter(e.target.value))}     
          placeholder={t('filter.placeholder')}
        />
      </label>
    </div>
  );
};

export default Filter;