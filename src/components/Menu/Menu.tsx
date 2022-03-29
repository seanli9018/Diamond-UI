import React, { useState, createContext } from 'react'
import classNames from 'classnames'

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
}
export const MenuContext = createContext<IMenuContext>({ index: 0 })
const Menu: React.FC<MenuProps> = props => {
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [currentActive, setCurrentActive] = useState(defaultIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal',
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
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu
