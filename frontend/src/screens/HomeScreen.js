import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  //this should be equivalent to ../store state
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    //activates listproducts from ../actions/productActions
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword && page === 1 ? (
        <>
          <h1>Best Selling Products</h1>
          <ProductCarousel />
          <br></br>
          <div className='d-flex justify-content-between'>
            <h2>Latest Products</h2>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      ) : !keyword && page != 1 ? (
        <div className='d-flex justify-content-between'>
          <h2>Page {page}</h2>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </div>
      ) : (
        keyword && (
          <>
            <Link to='/'>
              <Button className='btn btn-light '>
                {' '}
                <i class='fas fa-arrow-circle-left fa-lg'></i> Go Back
              </Button>
            </Link>
          </>
        )
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products.length === 0 ? (
        <>
          <div className='d-flex justify-content-center'>
            <h1>No Results Founds</h1>
          </div>
          <div className='d-flex justify-content-center'>
            <i class='fas fa-frown-open fa-3x' style={{ color: 'green' }}></i>
          </div>
        </>
      ) : (
        <>
          <Row>
            {/* this is basically just v-for */}
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* this plugs in product data as product */}
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
