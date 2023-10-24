import React, { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import { Modal, Button, Form } from 'react-bootstrap';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function AddProduct({ closeEditModal, refreshPage }) {

    const { loading, data } = useQuery(QUERY_CATEGORIES)


    const [name, setName] = useState();
    const [author, setAuthor] = useState()
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState();
    const [tags, setTags] = useState();
    const [sale, setSale] = useState();
    const [selectedCategory, setSelectedCategory] = useState('');

    const [addProduct] = useMutation(ADD_PRODUCT);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };
    const handleImageChange = (e) => {
        setImage(e.target.value);
    };
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleTagsChange = (e) => {
        setTags(e.target.value);
    };
    const handleSaleChange = (e) => {
        const isOn = e.target.checked;
        setSale(isOn);
    };


    const handleSaveClick = () => {

        addProduct({
            variables: {
                name: name,
                author: author,
                image: image,
                description: description,
                category: category,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                sale: sale,
                tags: tags?.split(',').map((tag) => tag.trim())

            },
        })
            .then((response) => {
                console.log('Product added:', response);
                refreshPage();
            })
            .catch((error) => {
                console.error('Failed to add product:', error);
            });
    }

    return (
        <Modal show={true}>
            <Modal.Header closeButton onClick={closeEditModal}>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{ width: '100%' }}>
                    <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="author">
                        <Form.Label>Author:</Form.Label>
                        <Form.Control
                            type="text"
                            value={author}
                            onChange={handleAuthorChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Cover Image Link:</Form.Label>
                        <Form.Control
                            type="text"
                            value={image}
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Select a category</option>
                            {loading ? (
                                <option>Loading categories...</option>
                            ) : (
                                data.categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="tags">
                        <Form.Label>Tags:</Form.Label>
                        <Form.Control
                            type="text"
                            value={tags}
                            onChange={handleTagsChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="sale">
                        <Form.Check
                            type="checkbox"
                            label="Sale"
                            checked={sale}
                            onChange={handleSaleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSaveClick}>
                    Submit Product
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddProduct;
