import { Component } from 'react';
import css from './Form.module.css';
class Form extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };
  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    this.props.sendUserData(this.state);
    console.log(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <li className={css.item}>
          <label className={css.label}>Name</label>
          <input
            className={css.input}
            type="text"
            name="name"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
        </li>
        <li className={css.item}>
          <label className={css.label}>Number</label>
          <input
            className={css.input}
            type="tel"
            name="number"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />
        </li>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
export default Form;
