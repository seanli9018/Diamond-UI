import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './Button'

// define component meta
export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

// define story
export const ButtonWithTypes: ComponentStory<typeof Button> = () => (
  <>
    <Button btnType="default" onClick={action('clicked')}>
      Default Button
    </Button>
    <Button btnType="primary" onClick={action('clicked')}>
      Primary Button
    </Button>
    <Button btnType="success" onClick={action('clicked')}>
      Success Button
    </Button>
    <Button btnType="info" onClick={action('clicked')}>
      Info Button
    </Button>
    <Button btnType="warning" onClick={action('clicked')}>
      Warning Button
    </Button>
    <Button btnType="danger" onClick={action('clicked')}>
      Danger Button
    </Button>
    <Button btnType="link" href="www.google.com">
      Link Button
    </Button>
  </>
)

export const ButtonWithSizes: ComponentStory<typeof Button> = () => (
  <>
    <Button btnType="default" onClick={action('clicked')}>
      Default Button
    </Button>
    <Button size="lg" onClick={action('clicked')}>
      Large Button
    </Button>
    <Button size="sm" onClick={action('clicked')}>
      Small Button
    </Button>
  </>
)
