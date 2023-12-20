import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
const ContactList = ({ list, handleDelete }) => {
  console.log(list);
  return (
    <div className={css.list}>
      {list.map(el => (
        <Contact contact={el} key={el.id} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ContactList;
