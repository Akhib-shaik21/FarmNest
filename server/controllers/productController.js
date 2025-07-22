const Product = require('../models/product');

// @desc    Fetch all products with optional search functionality
// @route   GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [ // Search across multiple fields
            { name: { $regex: req.query.search, $options: 'i' } }, // Case-insensitive regex search on name
            { description: { $regex: req.query.search, $options: 'i' } }, // Case-insensitive regex search on description
            // If you had denormalized farmerName or categoryName in Product model, you could search those too
            // { farmerName: { $regex: req.query.search, $options: 'i' } },
            // { categoryName: { $regex: req.query.search, $options: 'i' } }
          ],
        }
      : {}; // If no search keyword, return an empty object (no filter)

    const products = await Product.find({ ...keyword }); // Apply the search filter
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product by ID (no change)
// @route   GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product (Admin only) (no change)
// @route   POST /api/products
const createProduct = async (req, res, next) => {
  const { name, image, description, price, category, countInStock } = req.body;

  try {
    // You might need to retrieve farmerName and farmName from the user object here
    // and save it to the product for denormalization purposes if your schema includes them.
    const product = new Product({
      name: name,
      image: image,
      description: description,
      price: price,
      category: category, // This will be the category _id
      countInStock: countInStock,
      // farmer: req.user._id, // If linking to farmer user, you need req.user to be available via protect middleware
      // farmerName: req.user.username, // Denormalized example
      // farmName: req.user.farmDetails.farmName // Denormalized example if available
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product (Admin only) (no change)
// @route   PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  const { name, image, description, price, category, countInStock } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.image = image || product.image;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product (Admin only) (no change)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };