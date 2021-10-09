import * as React from 'react';
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

test('renders a message', () => {
  const {container, getByText} = render(<App />)
  expect(getByText('I am also waiting for this...')).toBeInTheDocument()
  expect(container.firstChild).toMatchInlineSnapshot(`
  <div>
    <h1>
      I am also waiting for this...
    </h1>
  </div>
  `)
})