import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  //this should be equivalent to ../store state
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    //activates listproducts from ../actions/productActions
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {/* this is basically just v-for */}
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {/* this plugs in product data as product */}
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
