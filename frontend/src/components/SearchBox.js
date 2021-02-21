import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <span className='d-flex'>
        <Form.Control
          type='text'
          id='searchBox'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
        ></Form.Control>
        <Button type='submit' variant='outline-warning' className='p-2 mr-sm-5'>
          <i class='fas fa-search'></i>
        </Button>
      </span>
    </Form>
  )
}

export default SearchBox
