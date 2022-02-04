import { useEffect, useRef, useContext } from 'react';
import { connect } from 'react-redux';
import { contactsActions } from 'redux/contacts';
import { ThemeContext, themes } from 'context/themeContext';
import s from './Filter.module.css';
import { useTranslation } from 'react-i18next';

const Filter = ({ value, onChange }) => {
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
          value={value}
          onChange={onChange}
          placeholder={t('filter.placeholder')}
        />
      </label>
    </div>
  );
};

const mapStateToProps = state => ({
  value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(contactsActions.changeFilter(e.target.value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
