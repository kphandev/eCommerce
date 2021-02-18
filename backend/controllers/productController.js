import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// gets all products
// /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('user', 'name email')

  res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

export { getProducts, getProductById }
