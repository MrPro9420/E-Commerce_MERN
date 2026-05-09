import express from "express";
import {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  updateProductDetails,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProductDetails);
router.patch("/:id", updateProduct);

export default router;
