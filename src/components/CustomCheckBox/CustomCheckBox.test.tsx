import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomCheckbox from './CustomCheckbox';

describe('CustomCheckbox Component', () => {
  const mockOnChange = jest.fn();

  it('renders the checkbox with the correct label', () => {
    render(<CustomCheckbox checked={false} label="Test Label" onChange={mockOnChange} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('applies the checked state correctly', () => {
    render(<CustomCheckbox checked={true} label="Checked" onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls the onChange handler when clicked', () => {
    render(<CustomCheckbox checked={false} label="Click Test" onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
