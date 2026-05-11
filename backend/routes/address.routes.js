import express from "express";

import {
  saveAddress,
  getAddresses,
} from "../controllers/address.controller.js";

const addressRouter = express.Router();
addressRouter.post("/add", saveAddress);
addressRouter.get("/:userId", getAddresses);

export default addressRouter;
