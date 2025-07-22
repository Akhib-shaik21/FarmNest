const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // URL to product image
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  category: { type: String, required: true }, // e.g., Fruits, Vegetables, Grains
  countInStock: { type: Number, required: true, default: 0 },
  // Optional: If you want to link products directly to specific farmer accounts
  // farmer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User',
  // },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

// FIX: Check if model already exists before compiling it to prevent OverwriteModelError with nodemon
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
module.exports = Product;