import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from './Button';

const meta: Meta<typeof Card> = {
  title: 'Example/Card',
  component: Card,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a card component that adapts to the current theme. Try switching themes to see it change!'
  }
};

export const WithButton: Story = {
  args: {
    title: 'Interactive Card',
    description: 'A card with a button inside',
    children: <Button primary label="Click me" />
  }
};

export const LongContent: Story = {
  args: {
    title: 'Card with Long Content',
    description: 'This card demonstrates how longer content looks in different themes.',
    children: (
      <div>
        <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Button label="Read more" />
      </div>
    )
  }
};
