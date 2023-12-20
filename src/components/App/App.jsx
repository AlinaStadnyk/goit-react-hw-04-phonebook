import { Component } from 'react';
import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      this.setState({
        contacts: JSON.parse(localData),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.contacts.length);

    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  sendUserData = data => {
    const newUser = {
      ...data,
      id: nanoid(),
    };
    const isDuplicated = this.state.contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isDuplicated) {
      return Notiflix.Notify.failure(`${data.name} is already in contacts`);
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, newUser],
    }));
  };
  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };
  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };
  render() {
    return (
      <div className={css.main}>
        <h1 className={css.title}>Phonebook</h1>

        <Form sendUserData={this.sendUserData} />
        <Filter
          changeFilter={this.changeFilter}
          filter={this.state.filter}
          value={this.filter}
        />
        <h2 className={css.title}>Contacts</h2>
        {this.state.contacts.length > 0 && (
          <ContactList
            list={this.getFilteredContacts()}
            handleDelete={this.handleDelete}
          />
        )}
      </div>
    );
  }
}
export default App;
