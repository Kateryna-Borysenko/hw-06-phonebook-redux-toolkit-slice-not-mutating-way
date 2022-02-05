import { connect } from 'react-redux';
import { contactsActions } from 'redux/contacts';
import s from './ContactList.module.css';
import Paper from 'components/common/Paper/Paper';
import { useContext} from 'react';
import { ThemeContext, themes } from 'context/themeContext';
import { useTranslation } from 'react-i18next';

const ContactList = ({ contacts, onDelete }) => {
  const { theme } = useContext(ThemeContext);
  
  const { t } = useTranslation();

  return (
    <ul className={s.contactList}>
      {contacts.map(({ id, name, number }) => (
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
            onClick={() => onDelete(id)} 
          >
            {t('contactList.btn')}
          </button>
        </Paper>
      ))}
    </ul>
  );
};

const onFilterChange = (contacts, filterValue) => {

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase()),
    );
   
  if (filteredContacts.length){
    return filteredContacts;
  } else {
    return contacts; 
  }
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: onFilterChange(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);