// frontend/src/components/UpdateSpotForm/index.js
import    React, { useState }   from 'react';
import  { Modal }               from '../../../context/Modal';
import    UpdateSpotForm        from './UpdateSpotForm';

const UpdateSpotFormModal = ({spotToUpdate}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='update-spot-button-in-modal' onClick={() => setShowModal(true)}>Update Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSpotForm setShowModal={setShowModal} spotToUpdate={spotToUpdate}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateSpotFormModal;
