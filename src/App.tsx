import React from 'react'
import Button, { ButtonSize, ButtonType } from './components/Button/Button'

function App() {
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
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
