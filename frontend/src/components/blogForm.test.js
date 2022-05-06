import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test(' updates parent state and calls onSubmit', async() => {
  const createBlog = jest.fn()
 const user = userEvent.setup()

   render(
    <BlogForm createBlog={createBlog} />
  )

  const input = screen.getAllByRole('textbox')
  const form = screen.getByText('save')

  await user.type(input[0], 'testing')
  await user.click(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing')
})