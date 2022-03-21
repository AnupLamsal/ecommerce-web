import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState(null);

    const { name, email, password, confirmPassword } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/";

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(register(formData));
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="py-2">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                        type="name"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={e => onChange(e)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="py-2">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => onChange(e)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="py-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => onChange(e)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="py-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={e => onChange(e)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="my-2">
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account?{" "}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                        className="text-decoration-none"
                    >
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
