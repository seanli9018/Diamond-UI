import React, { useState } from 'react'
import Button, { ButtonSize, ButtonType } from './components/Button/Button'
import Alert, { AlertType } from './components/Alert/Alert'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'

function App() {
  const [sAlert, setSAlert] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType={ButtonType.Primary}>Primary Button</Button>
        <Button btnType={ButtonType.Danger}>Danger Button</Button>
        <Button btnType={ButtonType.Info}>Info Button</Button>
        <Button btnType={ButtonType.Warning}>Warning Button</Button>
        <Button btnType={ButtonType.Success}>Success Button</Button>
        <Button disabled>Disabled Default Button</Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>
          Large Primary
        </Button>
        <Button size={ButtonSize.Small}>Button Small</Button>
        <Button btnType={ButtonType.Link} href="www.google.com">
          Link Button
        </Button>
        <Button btnType={ButtonType.Link} disabled href="www.google.com">
          Disabled Link
        </Button>
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
      </header>
    </div>
  )
}

export default App
