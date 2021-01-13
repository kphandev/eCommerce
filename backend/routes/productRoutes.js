import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
const router = express.Router()

// gets all products
// /api/products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
  })
)

// gets single product
// /api/products/:id
// req gives us the id in the url
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  })
)

export default router
