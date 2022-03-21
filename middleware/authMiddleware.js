import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const auth = asyncHandler(async (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, No token");
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id, "-password");
        next();
    } catch (err) {
        res.status(401);
        throw new Error("Not authorized, Invalid token");
    }
});

export default auth;
