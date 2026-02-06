import { describe, expect, test, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import DateTimePrimitive from '.'

afterEach(() => cleanup())

describe('Date-Time Primitive test', () => {
  test('Should render date-time primitive', () => {
    render(<DateTimePrimitive date="2021-01-01" format="DD/MM/YYYY" />)
    expect(screen.getByText('01/01/2021')).toBeDefined()
  })

  test('Should render given format', () => {
    render(<DateTimePrimitive date="2021-03-01" format="MM-DD-YYYY" />)
    expect(screen.getByText('03-01-2021')).toBeDefined()
  })

  test('Should handle invalid date', () => {
    render(
      <DateTimePrimitive date="invalid date content" format="MM-DD-YYYY" />
    )
    expect(screen.getByText('Invalid Date')).toBeDefined()
  })

  test('Should handle invalid format', () => {
    render(<DateTimePrimitive date="2021-03-01" format="invalid format" />)
    expect(screen.getByText('invamli1 for0amt')).toBeDefined()
  })
})
