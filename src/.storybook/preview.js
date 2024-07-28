import { addDecorator } from '@storybook/react';
import { withActions } from '@storybook/addon-actions';

// Apply actions decorator globally
addDecorator(withActions);
