import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [formData, setFormData] = useState({
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { address, city, postalCode, country } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveShippingAddress(formData));
        navigate("/payment");
    };

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="py-2" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={address}
                        onChange={e => onChange(e)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="py-2" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        value={city}
                        onChange={e => onChange(e)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="py-2" controlId="postalCode">
                    <Form.Label>postalCode</Form.Label>
                    <Form.Control
                        type="text"
                        name="postalCode"
                        placeholder="Enter postalCode"
                        value={postalCode}
                        onChange={e => onChange(e)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="py-2" controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        name="country"
                        placeholder="Enter Country"
                        value={country}
                        onChange={e => onChange(e)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
