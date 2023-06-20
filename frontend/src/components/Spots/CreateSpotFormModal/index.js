// frontend/src/components/CreateSpotModal/index.js
import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CreateSpotForm from "./CreateSpotForm";

const CreateSpotFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="create-spot-button-in-modal"
        onClick={() => setShowModal(true)}
      >
        Become a Host
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default CreateSpotFormModal;
