import React from 'react'
import { Route } from 'react-router-dom'
import { logout } from '../actions/userActions'
//useDispatch: calls an action
//useSelector: bring something in
import SearchBox from './SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <h3 className='mainlogo'>eShop</h3>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {/* using route here b/c importing the component alone does not give access to 'history or match' */}
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />

              {userInfo ? (
                <>
                  <NavDropdown
                    title={
                      <span>
                        <i className='fas fa-user fa-lg'></i> {userInfo.name}
                      </span>
                    }
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user fa-lg'></i> Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <span>
                      <i className='fas fa-tools fa-lg'></i>
                      <span className='d-sm-block d-md-none'> Admin tools</span>
                    </span>
                  }
                  id='adminmenu'
                >
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderList'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <LinkContainer to='/cart'>
                <Nav.Link className='d-flex'>
                  <i className='fas fa-shopping-cart fa-lg'></i>
                  <span className='d-sm-block d-md-none'>Cart</span>
                  <h6 style={{ color: '#ffc107' }}>
                    ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h6>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
