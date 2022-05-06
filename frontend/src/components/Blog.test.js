import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {

  let blog = {
    title:"React",
    author:"Gaurav",
    url:"https://fullstackopen2022.com/",
    likes:7
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('renders title and author', () => {
    const component = render(
      <Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
      'React Gaurav'
    )
  })

  test('button to display url and number of likes', () => {
    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https://fullstackopen2022.com/'
    )

    expect(component.container).toHaveTextContent(
      '7'
    )
  })
})