import    React, { useState }   from 'react';
import  { Modal }               from '../../../context/Modal';
import    DeleteReviewForm      from './DeleteReviewForm';

const DeleteReviewFormModal = ({reviewToUpdate}) => {
    const [showModal, setShowModal] = useState(false);
    console.log('+++++++++', reviewToUpdate)

    return (
    <>
      <button className='delete-review-button-in-modal' onClick={() => setShowModal(true)}>Delete Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReviewForm setShowModal={setShowModal} reviewToUpdate={reviewToUpdate}/>
        </Modal>
      )}
    </>
    );
};

export default DeleteReviewFormModal;
