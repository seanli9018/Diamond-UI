import React, { ReactElement, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-bottom' | 'zoom-in-left'

// interface TransitionProps extends CSSTransitionProps {
//   animation?: AnimationName
// }

type TransitionProps = CSSTransitionProps & {
  nodeRef?: React.MutableRefObject<null>
  style?: React.CSSProperties
  animation?: AnimationName
}

const Transition: React.FC<TransitionProps> = props => {
  const { children, nodeRef, classNames, animation, style, ...restProps } = props
  const transitionElementRef = useRef(null)
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      nodeRef={!!nodeRef ? nodeRef : transitionElementRef}
      {...restProps}
    >
      <div style={style} ref={!!nodeRef ? nodeRef : transitionElementRef}>
        {children}
      </div>
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition
