import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CustomCheckbox from '../../components/CustomCheckbox';

describe('CustomCheckbox Component', () => {
  const mockOnChange = jest.fn();

  it('should render the checkbox with the correct label', () => {
    render(
      <CustomCheckbox
        checked={false}
        label="Test Label"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should match the snapshot when unchecked', () => {
    const { asFragment } = render(
      <CustomCheckbox
        checked={false}
        label="Test Label"
        onChange={mockOnChange}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should match the snapshot when checked', () => {
    const { asFragment } = render(
      <CustomCheckbox
        checked={true}
        label="Checked"
        onChange={mockOnChange}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should apply the checked state correctly when checked', () => {
    render(
      <CustomCheckbox
        checked={true}
        label="Checked"
        onChange={mockOnChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should apply the unchecked state correctly when not checked', () => {
    render(
      <CustomCheckbox
        checked={false}
        label="Unchecked"
        onChange={mockOnChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should call the onChange handler when clicked', () => {
    render(
      <CustomCheckbox
        checked={false}
        label="Click Test"
        onChange={mockOnChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should match the snapshot after clicking', () => {
    const { asFragment } = render(
      <CustomCheckbox
        checked={false}
        label="Click Test"
        onChange={mockOnChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(asFragment()).toMatchSnapshot();
  });
});
