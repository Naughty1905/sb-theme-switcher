import preview from '../.storybook/preview';
import { Button } from './Button';

const meta = preview.meta({
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    }
  }
});

export const Primary = meta.story({
  args: {
    primary: true,
    label: 'Primary Button'
  }
});

export const Secondary = meta.story({
  args: {
    label: 'Secondary Button'
  }
});

export const Large = meta.story({
  args: {
    size: 'large',
    label: 'Large Button'
  }
});

export const Small = meta.story({
  args: {
    size: 'small',
    label: 'Small Button'
  }
});
