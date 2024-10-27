import express, { Router } from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {
    getProducts,
    createProducts,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProducts);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
