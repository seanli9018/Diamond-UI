import React from 'react'
import classNames from 'classnames'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning',
}

interface IAlertPosition {
  top: number
  right: number
  zIndex: number
}

interface BaseAlertProps {
  alertType?: AlertType
  showClose?: boolean
  autoClose?: number
  header?: React.ReactNode
  message: React.ReactNode
  className?: string
  alertPosition?: IAlertPosition
}

const Alert: React.FC<BaseAlertProps> = props => {
  const { alertType, showClose, autoClose, header, message, className, alertPosition } = props
  const classes = classNames('alert-container', className, {
    [`alert-${alertType}`]: alertType,
  })
  return (
    <div className={classes} style={alertPosition}>
      {!!header && <header className="alert-header">{header}</header>}
      <article className="alert-message">{message}</article>
    </div>
  )
}

Alert.defaultProps = {
  alertType: AlertType.Default,
  showClose: true,
  autoClose: 0,
  alertPosition: {
    top: 20,
    right: 10,
    zIndex: 999,
  },
}

export default Alert
