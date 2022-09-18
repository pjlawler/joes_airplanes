import { useState } from "react";

const Modal = (props) => {
  // destructures the props
  const { editingRecord, displayModal, plane, updateAirplane, addAirplane } =
    props;

  // destructures the plane object if it exists, if not makes it an empty object
  const { reg, mfr, model, value } = plane ? plane : {};

  // DATA VALIDATORS

  const validateData = (formData) => {
    setMessage(null);

    if (!formData.reg) {
      setMessage('Error: a registration number is required to save the data')
      return null;
    }

    // ensures that the manufacturer name is not blank
    else if (!formData.mfr) {
      setMessage('Error: a manufacturer name is required to save the data');
      return null;
    }

    // ensures the model name is not blank
    else if (!formData.model) {
      setMessage('Error: a model name is required to save the data');
      return null;
    }

    // ensures the value is an actual number
    else if (!isValidAmount(formData.value)) {
      setMessage('Error: please enter a valid value, do not enter commas, decimals or other characters - just digits.')
      return null;
    }

    // if all the validations above pass, then retrieves and converts the formData in the form
    return {
      reg: formData.reg,
      mfr: formData.mfr,
      model: formData.model,
      value: parseInt(formData.value),
    };
  };


  const isValidAmount = (val) => {
    // converts the text entry to an integer
    const validate = parseInt(val);
    console.log(validate, val)
    // returns false if the entry was not a number is not NaN
    if (validate !== validate) return false;
    // returns as invalid if the text was not just digits
    else if (validate != val) return false;
    // returns as a valid amount
    else return true;
  };

  // HANDLER FUNCTIONS

  const handleChange = (e) => {
    // updates the formstate whenever user moves between fields
    setState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleButtonClick = (e) => {

    // gets the form data if it's verified, it will be null if there's an error displayed in the modal
    const verifiedFormData = validateData(formState);
    
    switch (e.target.className) {
      case "save_button":

        // reutrns if the data is null, to allow user to correct data
        if (!verifiedFormData) return false;  

        // determines which CRUD operation to use based on the user is adding or editing
        if (editingRecord !== null) {
          // update record
          updateAirplane(verifiedFormData, editingRecord);
        } else {
          // add a record
          addAirplane(verifiedFormData);
        }
    }

    // closes the modal form and returns to the main page
    displayModal(false);
  };

  // STATE

  // stores the state for each of the forms fields
  const [formState, setState] = useState(
    editingRecord === null
      ? {
          reg: "",
          mfr: "",
          model: "",
          value: "",
        }
      : plane
  );

  // error message to be displayed in modal if it includes bad data
  const [displayMessage, setMessage] = useState(null);

  return (
    <div className="modal_form">
      {editingRecord !== null ? <h1 className="modal_title">Edit Airplane</h1> : <h1 className="modal_title">Add Airplane</h1>}
      <div className="main_form">
        <div className="input_wrapper">
          <label htmlFor="input_reg">Reg #:</label>
          <input
            type="text"
            name="reg"
            onBlur={handleChange}
            defaultValue={editingRecord !== null ? reg : null}
            placeholder={"Registration # (i.e. N337PC)"}
          />
        </div>
        <div className="input_wrapper">
          <label htmlFor="input_mfr">Mfg:</label>
          <input
            type="text"
            id="input_mfr"
            onBlur={handleChange}
            name="mfr"
            defaultValue={editingRecord !== null ? mfr : null}
            placeholder={"Manufacture (i.e. Cirrus)"}
          />
        </div>
        <div className="input_wrapper">
          <label htmlFor="input_model">Model:</label>
          <input
            type="text"
            id="input_model"
            name="model"
            onBlur={handleChange}
            defaultValue={editingRecord !== null ? model : null}
            placeholder={"Model (i.e. SR22T G6)"}
          />
        </div>
        <div className="input_wrapper">
          <label htmlFor="input_value">Value:</label>
          <input
            type="text"
            id="input_value"
            name="value"
            onBlur={handleChange}
            defaultValue={editingRecord !== null ? value : null}
            placeholder={"Value (i.e. 800000)"}
          />
        </div>
      </div>
      <div className="button_wrapper">
        <button className="save_button" onClick={handleButtonClick}>
          Save
        </button>
        <button className="cancel_button" onClick={handleButtonClick}>
          Cancel
        </button>
      </div>
      <p className="error_message">{displayMessage}</p>
    </div>
  );
};

export default Modal;
