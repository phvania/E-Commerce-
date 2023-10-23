import React, { useState } from 'react';

function EditProductDetails({ currentProduct }) {
  // State variables to store edited values
  const [editedName, setEditedName] = useState(currentProduct.name);
  const [editedDescription, setEditedDescription] = useState(currentProduct.description);
  const [editedPrice, setEditedPrice] = useState(currentProduct.price);

  // Handle input changes and update state
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value);
  };

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
    </div>
  );
}

export default EditProductDetails;
