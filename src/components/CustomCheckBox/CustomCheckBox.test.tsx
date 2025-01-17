import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CustomCheckbox from './CustomCheckbox';

describe('CustomCheckbox Component', () => {
  const mockOnChange = jest.fn();

  it('renders the checkbox with the correct label', () => {
    const { asFragment } = render(
      <CustomCheckbox
        checked={false}
        label="Test Label"
        onChange={mockOnChange}
      />
    );

    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('applies the checked state correctly', () => {
    const { asFragment } = render(
      <CustomCheckbox checked={true} label="Checked" onChange={mockOnChange} />
    );

    expect(asFragment()).toMatchSnapshot();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls the onChange handler when clicked', () => {
    const { asFragment } = render(
      <CustomCheckbox
        checked={false}
        label="Click Test"
        onChange={mockOnChange}
      />
    );

    expect(asFragment()).toMatchSnapshot();

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(asFragment()).toMatchSnapshot();

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
