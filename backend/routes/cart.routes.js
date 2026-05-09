import {
  addToCart,
  updateQuantity,
  getCartById,
  removeItem,
} from "../controllers/cart.controller.js";

import express from "express";

const routes = express.Router();

routes.post("/add", addToCart);
routes.post("/remove", removeItem);
routes.post("/update", updateQuantity);
routes.post("/:userId", getCartById);

export default routes;
