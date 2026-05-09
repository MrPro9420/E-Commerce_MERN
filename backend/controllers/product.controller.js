import Product from "../models/product.model.js";

// Create new product

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      message: `Product created Successfully with Title : ${product.title}`,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Product
export const getAllProduct = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }

    const allProduct = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ message: "All Product Fetch Completed", allProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Update a product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" },
    );
    res.json({
      message: `Product updated with title ${updatedProduct.title}`,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//delete a product

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: `product Deleted Successfully with title ${deletedProduct.title}`,
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" }, error);
  }
};

// get product by id

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({
      message: `Product with id ${req.params.id} found`,
      product: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" }, error);
  }
};

export const updateProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    let updatedProduct = { ...product, ...req.body };
    console.log(updatedProduct);
    updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      updatedProduct,
      { returnDocument: "after" },
    );

    res.json({
      message: `Product updated with title: ${updatedProduct.title}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" }, err);
  }
};
