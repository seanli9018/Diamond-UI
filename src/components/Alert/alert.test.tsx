import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Alert, { AlertType, AlertProps } from './Alert'

const defaultProps: AlertProps = {
  children: <p>default text</p>,
  onClose: jest.fn(),
}

const propsAlert: AlertProps = {
  alertType: AlertType.Warning,
  onClose: jest.fn(),
  children: <p>Warning text</p>,
  className: 'test-class',
  showClose: true,
  closeLabel: 'Test Close',
}

describe('test alert component', () => {
  it('Render default alert component', () => {
    render(<Alert {...defaultProps} />)
    const element = screen.queryByText('default text')
    expect(element).toBeInTheDocument()
    const containerElement = screen.getByTestId('alert-container')
    expect(containerElement).toBeInTheDocument()
    expect(containerElement.tagName).toEqual('DIV')
    expect(containerElement).toHaveClass('alert-container alert-default')
    const closeBtn = screen.getByText('close')
    expect(containerElement).toContainElement(closeBtn)
    fireEvent.click(closeBtn)
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
  it('Render alert component based on different props', () => {
    render(<Alert {...propsAlert} />)
    const element = screen.getByText('Warning text')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('P')
    const containerElement = screen.getByTestId('alert-container')
    expect(containerElement).toBeInTheDocument()
    expect(containerElement.tagName).toEqual('DIV')
    expect(containerElement).toHaveClass('alert-container alert-warning test-class')
    const closeBtn = screen.queryByText('Test Close') as HTMLElement
    expect(closeBtn).toBeInTheDocument()
    expect(containerElement).toContainElement(closeBtn)
    fireEvent.click(closeBtn)
    expect(propsAlert.onClose).toHaveBeenCalled()
  })
})
