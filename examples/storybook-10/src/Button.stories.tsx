import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
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
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button'
  }
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Button'
  }
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Button'
  }
};
