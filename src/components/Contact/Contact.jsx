import css from './Contact.module.css';
const Contact = ({ contact, handleDelete }) => {
  return (
    <div className={css.item}>
      <p className={css.contact}>
        {contact.name}: {contact.number}
      </p>
      <button className={css.button} onClick={() => handleDelete(contact.id)}>
        Delete
      </button>
    </div>
  );
};
export default Contact;
