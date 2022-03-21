import express from "express";
const app = express();
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import Product from "./routes/productRoutes.js";
import User from "./routes/userRoutes.js";
import Order from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/products", Product);
app.use("/api/users", User);
app.use("/api/orders", Order);

app.get("/api/config/paypal", (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5004;
app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}...`
            .yellow.bold
    )
);
