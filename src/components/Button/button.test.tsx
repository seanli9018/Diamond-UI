import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './Button'

const defaultProps = {
  onClick: jest.fn(),
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'test-class',
}

const linkBtnProps: ButtonProps = {
  btnType: ButtonType.Link,
  href: 'http://example.com',
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test Button component', () => {
  it('Render correct default button', () => {
    render(<Button {...defaultProps}>Test Button</Button>)
    const element = screen.getByText('Test Button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('Render correct button using different props', () => {
    render(<Button {...testProps}>Test Button</Button>)
    const element = screen.getByText('Test Button')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg test-class')
  })
  it('Render a link btn and href is provided', () => {
    render(<Button {...linkBtnProps}>Link Button</Button>)
    const element = screen.getByText('Link Button')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('Render a disabled btn', () => {
    render(<Button {...disabledProps}>Disabled Button</Button>)
    const element = screen.getByText('Disabled Button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    // expect(element).toHaveClass('btn btn-link')
    expect(element.disabled).toBeTruthy()
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
