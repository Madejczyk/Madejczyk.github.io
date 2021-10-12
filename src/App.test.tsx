import * as React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

test('renders a message', () => {
  const {container, getByText} = render(<App />)
  expect(getByText('I am also waiting for this...')).toBeInTheDocument()
  expect(container.firstChild).toMatchInlineSnapshot(`
  <div
    class="flex justify-center"
  >
    <p>
      I am also waiting for this...
    </p>
  </div>
  `)
})
