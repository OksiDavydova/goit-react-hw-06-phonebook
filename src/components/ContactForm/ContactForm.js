import React, { useState } from "react";
// import PropTypes from "prop-types";
import shortid from "shortid";
import s from "./ContactForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../../redux/actions-contacts";
import { getContactItems } from "../../redux/contacts-selector";

function ContactForm() {
  const contacts = useSelector(getContactItems);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  // console.log(contacts);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    const normalizedName = name.toLowerCase();
    if (
      contacts.find((contact) => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(`${name} is already in contacts list`);
      return;
    } else if (contacts.find((contact) => contact.number === number)) {
      alert(`${number} is already in contacts list`);
      return;
    } else {
      dispatch(addContact(newContact));
    }
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  const inputNameId = shortid.generate();
  const inputNumberId = shortid.generate();

  return (
    <div className={s.form_overlay}>
      <form onSubmit={handleSubmit} className={s.form}>
        <label htmlFor={inputNameId} className={s.label}>
          Name:
          <input
            type="text"
            className={s.input}
            onChange={handleChange}
            value={name}
            name="name"
            id={inputNameId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>

        <label htmlFor={inputNumberId} className={s.label}>
          Number:
          <input
            type="tel"
            className={s.input}
            onChange={handleChange}
            value={number}
            name="number"
            id={inputNumberId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <br />
        <button type="submit" className={s.btn_submit}>
          Add contact
        </button>
      </form>
    </div>
  );
}

// ContactForm.propTypes = {
//   addNewContact: PropTypes.func.isRequired,
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       name: PropTypes.string,
//       number: PropTypes.string,
//     })
//   ),
// };

// const mapStateToProps = (state) => {
//   return {
//     contacts: state.contacts,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addNewContact: (contact) => dispatch(addContact(contact)),
//   };
// };
export default ContactForm;
// export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
