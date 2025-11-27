import mongoose from "mongoose";
import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Mongoose method to get all products from the database.
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error fetching products:", error.message); // Debugging log.
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const createProduct = async (req, res) => {
  const product = req.body; // User will send product data in the request body.

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product); // From product.js object.

  try {
    await newProduct.save(); // Saving the new product to the database.
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product ID" });
  }
  
  try {
    await Product.findByIdAndDelete(id); // Mongoose method to find a document by its ID and delete it.
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error.message); // Debugging log. 
    res.status(500).json({ success: false, message: "Server Error" });
  }
}