import React, { useState, useContext, FunctionComponentElement, cloneElement, useRef } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
import Icon from '../Icon/Icon'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false
  const [menuOpen, setMenuOpen] = useState(isOpened)
  const cssTransitionNodeRef = useRef(null)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 200)
  }

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {}

  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return cloneElement(childElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.error('Warning: SubMenu has a non MenuItem component child.')
      }
    })
    return (
      <CSSTransition
        nodeRef={cssTransitionNodeRef}
        in={menuOpen}
        timeout={300}
        classNames="zoom-in-top"
      >
        <ul
          ref={cssTransitionNodeRef}
          className={subMenuClasses}
          data-testid="submenu-dropdown-container"
        >
          {childrenComponent}
        </ul>
      </CSSTransition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
