import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const sendUserData = ({ name, number }) => {
    const newUser = {
      name,
      number,
      id: nanoid(),
    };

    const isDuplicated = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicated) {
      return Notiflix.Notify.failure(`${name} is already in contacts`);
    }
    setContacts(prev => [...prev, newUser]);
  };

  const handleDelete = id => {
    setContacts(prev => {
      return prev.filter(el => el.id !== id);
    });
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <div className={css.main}>
      <h1 className={css.title}>Phonebook</h1>

      <Form onSubmit={sendUserData} />
      <Filter changeFilter={changeFilter} filter={filter} value={filter} />
      <h2 className={css.title}>Contacts</h2>
      {contacts.length > 0 && (
        <ContactList list={getFilteredContacts()} handleDelete={handleDelete} />
      )}
    </div>
  );
};
