import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  hadleFormSubmit = data => {
    const { name, number } = data;
    const addedToContacts = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (addedToContacts) {
      alert(`${name} is already in contacts!`);
      return;
    }

    this.setState(prev => {
      return {
        contacts: [
          ...prev.contacts,
          { id: nanoid(), name: name, number: number },
        ],
      };
    });
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleContactDelete = id => {
    this.setState(prev => {
      return {
        contacts: prev.contacts.filter(el => el.id !== id),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.hadleFormSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        {contacts.length > 0 && (
          <ContactList
            contacts={filteredContacts}
            onClick={this.handleContactDelete}
          />
        )}
      </>
    );
  }
}
