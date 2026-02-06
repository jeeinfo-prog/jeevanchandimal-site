import { describe, expect, test, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import CaisyDocumentLink from '.'

afterEach(() => cleanup())

const imageNode = {
  "attrs": {
    "documentId": "2bae4a7c-39cd-4241-b1c0-88bdb9d2baa6",
    "src": "https://assets.caisy.io/assets/3bd8eb33-2aaa-4620-87bf-d7ccd04d0245/2bae4a7c-39cd-4241-b1c0-88bdb9d2baa6/dd97d859-1094-4402-950f-dcc85b4d05f7download.jpeg"
  }
}

describe('Document Link test', () => {
  test('Can render an image if src exists in attribute', () => {
    render(
      <CaisyDocumentLink node={imageNode}> </CaisyDocumentLink>
    )
    expect(screen.getByRole('img')).toBeDefined()
  })

  test('Will render children if attributes src is not defined', () => {
    render(
      <CaisyDocumentLink node={{attrs: {}}}><span>Child text</span></CaisyDocumentLink>
    )
    expect(screen.getByText('Child text')).toBeDefined()
  })
})