import React, { useState, createContext, cloneElement } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallBack = (selectIndex: number) => void

export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallBack
}

interface IMenuContext {
  index: number
  onSelect?: SelectCallBack
  mode?: MenuMode
}
export const MenuContext = createContext<IMenuContext>({ index: 0 })
const Menu: React.FC<MenuProps> = props => {
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [currentActive, setCurrentActive] = useState(defaultIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const handleSelect = (index: number) => {
    setCurrentActive(index)
    if (!!onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleSelect,
    mode: mode,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>

      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return cloneElement(childElement, { index }) //to attach index props automatically
      } else {
        console.error('Warning: Menu has a non-MenuItem Component Child.')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="menu-container">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu
