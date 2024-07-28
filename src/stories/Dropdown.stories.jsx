import React, { useState } from 'react';
import Dropdown from '../components/Dropdown/Dropdown';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    label: { control: 'text' },
    labelVisibility: { control: 'select', options: ['Visible', 'Hidden'] },
    status: { control: 'select', options: ['Unfilled', 'Filled', 'Disabled', 'Error'] },
    labelIconVisibility: { control: 'select', options: ['Visible', 'Hidden'] },
    leftIconVisibility: { control: 'select', options: ['Visible', 'Hidden'] },
    helperText: { control: 'text' },
    required: { control: 'select', options: ['Yes', 'No'] },
    text: { control: 'text' },
    type: { control: 'select', options: ['SingleNoIcon', 'SingleRadio', 'Multi'] },
    activeItemIndex: { control: 'number' },
    items: { control: 'array' },
    onSelect: { action: 'selected' },
  },
};

const Template = (args) => {
  const [activeIndex, setActiveIndex] = useState(args.activeItemIndex);

  const handleSelect = (item, index) => {
    setActiveIndex(index);
    action('item selected')(item, index);
  };

  return <Dropdown {...args} activeItemIndex={activeIndex} onSelect={handleSelect} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Select an option',
  labelVisibility: 'Visible',
  status: 'Unfilled',
  labelIconVisibility: 'Hidden',
  leftIconVisibility: 'Hidden',
  helperText: '',
  required: 'No',
  text: 'Choose...',
  type: 'SingleNoIcon',
  activeItemIndex: -1,
  items: ['Option 1', 'Option 2', 'Option 3'],
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  label: 'Select an option',
  labelVisibility: 'Visible',
  status: 'Unfilled',
  labelIconVisibility: 'Visible',
  leftIconVisibility: 'Visible',
  helperText: '',
  required: 'No',
  text: 'Choose...',
  type: 'SingleNoIcon',
  activeItemIndex: -1,
  items: ['Option 1', 'Option 2', 'Option 3'],
};
