import * as React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

test('renders a message', () => {
  const {container} = render(<App />)
  expect(container).toMatchSnapshot()
})
