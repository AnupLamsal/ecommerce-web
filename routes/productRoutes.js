import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import Product from "../models/Product.js";
import {
    getProducts,
    getProductsById,
} from "../controllers/productController.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProductsById);

export default router;
