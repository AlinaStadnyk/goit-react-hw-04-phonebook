import css from './Filter.module.css';
const Filter = ({ filter, changeFilter }) => {
  return (
    <div className={css.filter}>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={changeFilter}
      ></input>
    </div>
  );
};
export default Filter;
