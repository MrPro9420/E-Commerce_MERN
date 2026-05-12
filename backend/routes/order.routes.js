import { placeOrder } from "../controllers/order.controller.js";
import { getOrderByUserId } from "../controllers/order.controller.js";

import express from "express";

const orderRouter = express.Router();

orderRouter.post("/placeorder", placeOrder);
orderRouter.get("/userorders/:userId", getOrderByUserId);

export default orderRouter;
