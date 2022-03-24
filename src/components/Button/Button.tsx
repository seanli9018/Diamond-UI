import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
}

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children: React.ReactNode
  href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// combine custom props with built in props.
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = props => {
  const { btnType, className, disabled, size, children, href, ...restProps } = props

  // prepare classNames.
  const classes = classNames('btn', className, {
    //btn-primary
    [`btn-${btnType}`]: btnType,
    //btn-lg
    [`btn-${size}`]: size,
    // a tag has no disabled attr, so need to include it in className
    disabled: btnType === ButtonType.Link && disabled,
  })

  // return element
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button
