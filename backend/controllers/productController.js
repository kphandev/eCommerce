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

// Delete product
// delete /api/products/:id
// private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: `Product ${product.name} removed` })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

// Create product
// post /api/products/
// private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// update product
// put /api/products/:id
// private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
