import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { listProducts } from "../actions/productActions";
import PropTypes from "prop-types";

import Product from "../components/Product";
import Loader from "../components/Loader";

const HomeScreen = ({
    listProducts,
    productList: { products, loading, error },
}) => {
    useEffect(() => {
        listProducts();
    }, [listProducts]);

    return (
        <>
            <h1 className="py-3">Latest Products</h1>
            {loading ? (
                <h2>
                    <Loader />
                </h2>
            ) : (
                <Row>
                    {products.length > 0 ? (
                        products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))
                    ) : (
                        <h3>No Products Found...</h3>
                    )}
                </Row>
            )}
        </>
    );
};

HomeScreen.propTypes = {
    listProducts: PropTypes.func.isRequired,
    productList: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    productList: state.productList,
});

export default connect(mapStateToProps, { listProducts })(HomeScreen);
