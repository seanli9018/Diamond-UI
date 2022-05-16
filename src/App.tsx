import React, { useState, useRef } from 'react'
import Button from './components/Button/Button'
import Alert, { AlertType } from './components/Alert/Alert'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import Icon from './components/Icon/Icon'
import Transition from './components/Transition/Transition'

const App: React.FC = () => {
  const [sAlert, setSAlert] = useState(false)
  const [show, setShow] = useState(false)
  const testRef = useRef(null)
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="coffee" theme="danger" size="10x" />
        <Button btnType="primary">Primary Button</Button>
        <Button disabled>Disabled Default Button</Button>
        <Button size="sm">Button Small</Button>
        <Alert alertType={AlertType.Warning}>
          <h3>Warning Header</h3>
          <div>This is a long description!</div>
        </Alert>
        <Alert alertType={AlertType.Danger} autoClose={3000}>
          <h3>Danger Header</h3>
          <div>This is a long description!</div>
        </Alert>
        <Alert
          closeLabel="Close Alert"
          onClose={() => {
            console.log('closed')
          }}
          show={sAlert}
        >
          <h3>Default Alert Header</h3>
          <div>This is a long description!</div>
        </Alert>
        <Button
          onClick={() => {
            setSAlert(prevAlert => !prevAlert)
          }}
        >
          setSAlert
        </Button>
        <Menu
          defaultIndex={'0'}
          onSelect={index => {
            console.log(index)
          }}
          // mode="vertical"
          defaultOpenSubMenus={['2']}
        >
          <MenuItem>Hello1</MenuItem>
          <MenuItem disabled>Hello2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>Hello3</MenuItem>
        </Menu>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button size="lg" onClick={() => setShow(!show)}>
          Toggle
        </Button>
        <Transition nodeRef={testRef} in={show} timeout={300} animation="zoom-in-bottom">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </Transition>
      </header>
    </div>
  )
}

export default App
