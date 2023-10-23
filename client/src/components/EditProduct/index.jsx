import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT_DETAILS } from '../../utils/mutations';
function EditProductDetails({ currentProduct }) {
  
  const [editedName, setEditedName] = useState(currentProduct.name);
  const [editedDescription, setEditedDescription] = useState(currentProduct.description);
  const [editedPrice, setEditedPrice] = useState(currentProduct.price);

  const [updateProduct] = useMutation(UPDATE_PRODUCT_DETAILS);
 
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value);
  };

  const handleSaveClick = () => {

    updateProduct({
      variables: {
        id: currentProduct._id,

        name: editedName,
        description: editedDescription,
        price: parseFloat(editedPrice),
      },
    })
      .then((response) => {
        console.log('Product updated:', response);
      })
      .catch((error) => {
        console.error('Update failed:', error);
      });
  }

  return (
    <div>
      <div>
        <label htmlFor="editedName">Name:</label>
        <input
          type="text"
          id="editedName"
          value={editedName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="editedDescription">Description:</label>
        <textarea
          id="editedDescription"
          value={editedDescription}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <label htmlFor="editedPrice">Price:</label>
        <input
          type="number"
          id="editedPrice"
          value={editedPrice}
          onChange={handlePriceChange}
        />
      </div>

      <button onClick={handleSaveClick}>Save Product Details</button>
    </div>
  );
}

export default EditProductDetails;
