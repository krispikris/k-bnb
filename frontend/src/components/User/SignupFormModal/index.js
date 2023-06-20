// frontend/src/components/SignupFormModal/index.js
import    React, { useState }   from 'react';
import  { Modal }               from '../../../context/Modal';
import    SignupForm            from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="signup-button-in-modal"  onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
