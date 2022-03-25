import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning',
}

interface BaseAlertProps {
  alertType?: AlertType
  show?: boolean
  showClose?: boolean
  closeLabel?: React.ReactNode
  onClose?: () => void
  autoClose?: number
  children: React.ReactNode
  className?: string
}

const Alert: React.FC<BaseAlertProps> = props => {
  const { alertType, show, showClose, closeLabel, onClose, autoClose, children, className } = props
  const [showAlert, setShowAlert] = useState(() => {
    if (show === undefined) {
      return true
    } else {
      return show
    }
  })

  // trigger setShowAlert when outside show prop changes.
  useEffect(() => {
    if (show === undefined) return
    setShowAlert(show)
  }, [show])

  // trigger onClose func.
  useEffect(() => {
    if (showAlert === false && !!onClose) {
      onClose()
    }
  }, [showAlert, onClose])

  // auto close
  useEffect(() => {
    if (!autoClose) return
    const autoCloseFunc = () => {
      console.log('auto close triggered')
      setShowAlert(false)
    }
    const timerId = setTimeout(autoCloseFunc, autoClose)
    return () => {
      if (!!timerId) clearTimeout(timerId)
    }
  }, [autoClose])

  // prepare class name
  const classes = classNames('alert-container', className, {
    [`alert-${alertType}`]: alertType,
  })

  return (
    <>
      {showAlert && (
        <div className={classes}>
          {children}
          {showClose && (
            <span
              className="alert-close-btn"
              onClick={() => {
                setShowAlert(false)
              }}
            >
              {!!closeLabel ? closeLabel : 'close'}
            </span>
          )}
        </div>
      )}
    </>
  )
}

Alert.defaultProps = {
  alertType: AlertType.Default,
  show: true,
  showClose: true,
  autoClose: 0,
}

export default Alert
