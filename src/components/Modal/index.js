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

    // ensures that the n-number is not blank
    if (!formData.reg) {
      setMessage("Error: a registration number is required to save the data");
      return null;
    }

    // ensures that the manufacturer name is not blank
    else if (!formData.mfr) {
      setMessage("Error: a manufacturer name is required to save the data");
      return null;
    }

    // ensures the model name is not blank
    else if (!formData.model) {
      setMessage("Error: a model name is required to save the data");
      return null;
    }

    // ensures the value is an actual number
    else if (!isValidAmount(formData.value)) {
      setMessage("Error: please enter a real number for the value.");
      return null;
    }

    // if all the validations above pass, then converts value to an integer and returns the formData

    // rounds the value to a whole number
    const roundedValue = parseFloat(
      formData.value.replace(/,/gi, "")
    ).toFixed();

    return {
      reg: formData.reg,
      mfr: formData.mfr,
      model: formData.model,
      value: roundedValue,
    };
  };

  // verifies that the data entered is a valid whole number
  const isValidAmount = (val) => {
    console.log(val);
    // removes any commas and verifies the number matches the string equivalent
    let validate = val.replace(/,/gi, "");

    // returns true if they are the same
    return validate == parseFloat(validate);
  };

  // HANDLER FUNCTIONS

  // updates the formState whenever user moves between fields
  const handleChange = (e) => {
    setState({ ...formState, [e.target.name]: e.target.value });
  };

  // handles any button clicks on the modal form
  const handleButtonClick = (e) => {
    switch (e.target.className) {
      case "save_button":
        // validates the form data - if it's not valid it will be null with an error message displayed in the modal
        const verifiedFormData = validateData(formState);

        // if the data are invalid, then it will stop the save until the user corrects the error
        if (!verifiedFormData) return false;

        // determines which CRUD operation to use based on if the user is adding or editing an airplane
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

  // state for each of the forms fields
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
      {/* title based on if editing or adding a record */}
      {editingRecord !== null ? (
        <h1 className="modal_title">Edit Airplane</h1>
      ) : (
        <h1 className="modal_title">Add Airplane</h1>
      )}
      <div className="main_form">
        <div className="input_wrapper">
          <label htmlFor="input_reg">Reg #:</label>
          <input
            type="text"
            name="reg"
            // executes the handleChange function when ever the user leaves the field
            onBlur={handleChange}
            // if editing, the data is entered if not it's left null
            defaultValue={editingRecord !== null ? reg : null}
            placeholder={"Registration # (i.e. N337PC)"}
          />
        </div>
        <div className="input_wrapper">
          <label htmlFor="input_mfr">Mfr:</label>
          <input
            type="text"
            id="input_mfr"
            onBlur={handleChange}
            name="mfr"
            defaultValue={editingRecord !== null ? mfr : null}
            placeholder={"Manufacturer (i.e. Cirrus)"}
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
        {/* executes the button click handler when either buttons are clicked in the modal */}
        <button className="save_button" onClick={handleButtonClick}>
          Save
        </button>
        <button className="cancel_button" onClick={handleButtonClick}>
          Cancel
        </button>
      </div>
      {/* displays an error message if any data are invalid */}
      <p className="error_message">{displayMessage}</p>
    </div>
  );
};

export default Modal;
