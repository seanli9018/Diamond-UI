import React from 'react'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
}

const generateMenu = (props: MenuProps): React.ReactElement => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>tab3</MenuItem>
    </Menu>
  )
}

let menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    render(generateMenu(testProps))
    menuElement = screen.getByTestId('menu-container')
    activeElement = screen.getByText('active')
    disabledElement = screen.getByText('disabled')
  })
  it('render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    const liElements = screen.getAllByRole('listitem')
    expect(liElements).toHaveLength(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the correct callback', () => {
    const thirdTab = screen.getByText('tab3')
    fireEvent.click(thirdTab)
    expect(thirdTab).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup() //clean up the screen rendered beforeEach()
    // re-render the screen using testVerProps
    render(generateMenu(testVerProps))
    const menuElement = screen.getByTestId('menu-container')
    expect(menuElement).toHaveClass('menu menu-vertical')
  })
})
