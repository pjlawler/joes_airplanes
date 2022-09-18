import Item from './components/Item';
import Modal from './components/Modal';
import React, { useState } from 'react';
import './App.css';

function App() {

  // LOCAL STORAGE FUNCTIONS

  const getData = () => {
    // retrieves and converts the stored data from localstorage
    return JSON.parse(localStorage.getItem('airplanes'));
  };

  const saveData = (dataSet) => {
    // sets the datatset in state
    setData(dataSet);

    // converts and saves the current datatset to localstorage
    localStorage.setItem('airplanes', JSON.stringify(dataSet));
  };

  // CRUD FUNCTIONS

  const getAllAirplanes = () => {
    // retrieves all airplanes
    return getData();
  };

  const addAirplane = (plane) => {
    // adds the airplane from the modal to the current data and updates local storage

    let newDataSet;

    if(!data) { 
      // if no previous data is stored it will create a blank datatset
      newDataSet = []; 
    }
    else {
      // copies the existing data into a new datatset
      newDataSet = data.filter((e) => { return true; });
    }
    
    // adds the new airplane
    newDataSet.push(plane);

    // stores and updates the datatset
    saveData(newDataSet);
  };

  const deleteAirplane = (index) => {
    // copies the existing data to a new datatset without the specified record
    const newDataSet = data.filter((e, i) => { return index !== i; });

    // stores and updates the datatset
    saveData(newDataSet);
  };

  const updateAirplane = (plane, index) => {
    // copies the existing data to a new datatset
    const newDataSet = data.filter((e, i) => { return true; });

    // updates the speciied location with the new plane information
    newDataSet.splice(index, 1, plane);

    // stores and updates the datatset
    saveData(newDataSet);
  };


  // HANDLER FUNCTIONS

  const buttonClick = (e) => {
    // button handler for the non-modal buttons, the classname is used to determine which button was tapped
    
    // disables button functionality if the modal is being displayed
    if (showModal) return;

    // if edit or delete are tapped the index of the data record is extrapolated from the target's data attribute
    const itemNumber = parseInt(e.target.dataset.item);

    switch (e.target.className) {
      case 'add_button':
        // ensures the editing record state is null, so the modal displays add airplane
        setRecord(null);
        
        // displays the modal form
        displayModal(true);
        break;

      case 'edit_button':
        // sets the editing record state to the index number of the item that is to be edited
        setRecord(itemNumber);
        
        // displays the modal form
        displayModal(true);
        break;

      case 'delete_button':
        // executes the delete airplane CRUD function on the respective index of the item clicked
        deleteAirplane(itemNumber);
        break;
    }
  };

  // STATE

  // stores the airplane array, gets all airplanes initially
  const [data, setData] = useState(getAllAirplanes());

  // toggles the modal page on/off
  const [showModal, displayModal] = useState(false);

  // when a record is being edited, it stores which record index is being edited
  const [editingRecord, setRecord] = useState(null);

  return (
    <div>
      {/* show title of page */}
      <h1 className='page_title'>Joe's Airplanes</h1>

      <main>
        {/* if there are aircraft in the datatset then display the rows */}
        {(data && data.length !==0) && (
          <>
            {/* creates the labels at the top of the rows */}
            <div className='item_row_labels'>
              <div className='airplane_wrapper'>
                <div id='aircraft'>Aircraft</div>
                <div id='value'>Value</div>
              </div>
              <div></div>
            </div>

            {/* uses the Item componenet to create an invidual row for each airplane in the datatset */}
            {data.map((plane, i) => (
              <Item key={i} plane={plane} buttonClick={buttonClick} index={i} />
            ))}
          </>
        )}

        {/* if there are no aircraft in the datatset then display the following */}
        {(!data || data.length === 0) && <div>No Airplanes have been saved yet!</div>}

        {/* provides the add button to add aircraft to the dataset */}
        <button className='add_button' onClick={buttonClick}>
          Add
        </button>

        {showModal && (
          <Modal
            editingRecord={editingRecord}
            displayModal={displayModal}
            plane={editingRecord != null ? data[editingRecord] : null}
            setData={setData}
            addAirplane={addAirplane}
            updateAirplane={updateAirplane}
          />
        )}
      </main>
    </div>
  );
}

export default App;
