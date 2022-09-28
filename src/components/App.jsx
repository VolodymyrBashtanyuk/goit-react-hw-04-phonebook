import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './FilterContact/FilterContact';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Title, SubTitle } from './AppStyle';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  const [filters, SetFilters] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = ({ name }) => {
    const result = contacts.find(item => item.name === name);
    return result;
  };

  const addContacts = data => {
    if (isDublicate(data)) {
      return alert(`${data.name} is already in contacts `);
    }
    const newContact = {
      id: nanoid(5),
      ...data,
    };

    return setContacts([...contacts, newContact]);
  };

  const filterChange = evt => {
    const { value } = evt.currentTarget;

    SetFilters(value);
  };

  const getFilter = () => {
    if (!filters) {
      return contacts;
    }

    const normalaizedFilter = filters.toLowerCase();

    return contacts.filter(({ name }) => {
      const normalaizedName = name.toLowerCase();
      const result = normalaizedName.includes(normalaizedFilter);
      return result;
    });
  };

  const removeContact = id => {
    const newContact = contacts.filter(item => item.id !== id);
    return setContacts(newContact);
  };

  return (
    <>
      <Title>Phonebook</Title>
      <ContactForm onAddContacs={addContacts} />
      {contacts.length !== 0 && (
        <>
          <SubTitle>Contacts</SubTitle>
          <Filter onChange={filterChange} value={filters} />
          <ContactList items={getFilter()} onRemove={removeContact} />
        </>
      )}
    </>
  );
};
