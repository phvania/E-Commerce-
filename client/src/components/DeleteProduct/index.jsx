import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteConfirmation({ currentProduct, closeDeleteConfirmation, handleDeleteProduct }) {

  return (
    <Modal show={true} onHide={closeDeleteConfirmation}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this product?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleDeleteProduct(currentProduct)}>
          Delete
        </Button>
        <Button variant="secondary" onClick={closeDeleteConfirmation}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmation;

  