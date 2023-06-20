import    React, { useState }   from 'react';
import  { Modal }               from '../../../context/Modal';
import    DeleteSpotForm        from './DeleteSpotForm';

const DeleteSpotFormModal = ({spotToUpdate}) => {
    const [showModal, setShowModal] = useState(false);
    console.log('+++++++++', spotToUpdate)

    return (
    <>
      <button className='delete-spot-button-in-modal'  onClick={() => setShowModal(true)}>Delete Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSpotForm setShowModal={setShowModal} spotToUpdate={spotToUpdate}/>
        </Modal>
      )}
    </>
    );
};

export default DeleteSpotFormModal;
