import    React, { useState }   from 'react';
import  { Modal }               from '../../../context/Modal';
import    UpdateReviewForm      from './UpdateReviewForm';

const UpdateReviewFormModal = ({reviewToUpdate}) => {
    const [showModal, setShowModal] = useState(false);


    return (
    <>
      <button className='update-review-button-in-modal' onClick={() => setShowModal(true)}>Update Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateReviewForm setShowModal={setShowModal} reviewToUpdate={reviewToUpdate}/>
          {/* updateReviewForm is a component that is being passed two props (setShowModal and reviewToUpdate)*/}

        </Modal>
      )}
    </>
    );
};

export default UpdateReviewFormModal;
