import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'

export interface MenuItemProps {
  index: number
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  })

  const handleSelect = () => {
    if (!!context.onSelect && !disabled) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleSelect}>
      {children}
    </li>
  )
}

export default MenuItem
