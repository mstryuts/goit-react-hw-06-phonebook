import css from '../ContactList/ContactList.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { useSelector } from 'react-redux';

const ContactList = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const getVisibleContacts = () => {
    if (!state.filter) return state.contacts;
    const normalizedFilter = state.filter.toLocaleLowerCase();

    return state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };
  const visibleContacts = getVisibleContacts();

  const delContact = id => {
    dispatch(deleteContact(id));
  };
  if (visibleContacts.length === 0) return null;
  return (
    <>
      <ul className={css.list}>
        {visibleContacts.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            {name}: {number}
            <button className={css.btn} onClick={() => delContact(id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
