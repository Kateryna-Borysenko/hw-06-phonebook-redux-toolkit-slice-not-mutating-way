import { useContext, useMemo, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { contactsActions } from 'redux/contacts';
import s from './ContactList.module.css';
import Paper from 'components/common/Paper/Paper';
import { ThemeContext, themes } from 'context/themeContext';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items); 
  const filter = useSelector(state => state.contacts.filter); 
  const dispatch = useDispatch();
  
  const { theme } = useContext(ThemeContext);
  
  const { t } = useTranslation();

  
  const filteredContacts = useMemo(() => {
    
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
    
  },[contacts, filter]);

  useEffect(() => {
    if (filteredContacts.length === 0) {
      
      dispatch(contactsActions.changeFilter('')); 
    }
  
  }, [filteredContacts.length, dispatch]);

  return (
    <ul className={s.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <Paper key={id}>
          <li className={s.contactListItem}>
            <p
              className={
                theme === themes.light
                  ? s.lightContactTitle
                  : s.darkContactTitle
              }
            >
              {name}:
            </p>
            <p
              className={
                theme === themes.light
                  ? s.lightContactTitle
                  : s.darkContactTitle
              }
            >
              {number}
            </p>
          </li>
          <button
            type="button"
            className={s.deleteBtn}
            onClick={()=> dispatch(contactsActions.deleteContact(id))} 
          >
            {t('contactList.btn')}
          </button>
        </Paper>
      ))}
    </ul>
  );
};

export default ContactList;