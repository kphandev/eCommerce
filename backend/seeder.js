import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import Users from './models/userModel.js'
import Products from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
import User from './models/userModel.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Products.deleteMany()
    await Users.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    //adds the products with the user of Admin
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Products.insertMany(sampleProducts)
    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`$(error)`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Products.deleteMany()
    await Users.deleteMany()

    console.log('Data destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`$(error)`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
