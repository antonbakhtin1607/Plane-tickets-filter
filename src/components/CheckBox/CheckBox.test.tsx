import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from '../../__mocks__/mockStore';
import CheckBox from './CheckBox';
import { setTransferFilter } from '../../redux/ducks/tickets';
import { useSearchParams } from 'react-router';

jest.mock('react-router', () => ({
  useSearchParams: jest.fn(),
}));

describe('CheckBox Component', () => {
  let store: any;
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    store = createMockStore({
      tickets: {
        transferFilter: [1,2],
        data: [],
        loading: false,
        error: null,
      },
    });
    store.dispatch = dispatchMock;
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), jest.fn()]);
  });

  test('renders checkboxes with correct initial state', () => {
    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );
  
    expect(screen.getByText('Кількість пересадок')).toBeInTheDocument();
    expect(screen.getByLabelText('Все')).toBeInTheDocument();
    expect(screen.getByLabelText('Без пересадок')).toBeInTheDocument();
    expect(screen.getByLabelText('1 пересадка')).toBeInTheDocument();
    expect(screen.getByLabelText('2 пересадки')).toBeInTheDocument();
    expect(screen.getByLabelText('3 пересадки')).toBeInTheDocument();
  });

  test('dispatches setTransferFilter when a checkbox is clicked', () => {
    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/2 пересадки/i));
    expect(dispatchMock).toHaveBeenCalledWith(setTransferFilter([1, 2]));
  });

  test('updates URL search params when checkbox is clicked', () => {
    const setSearchParamsMock = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), setSearchParamsMock]);

    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/3 пересадки/i));
    expect(setSearchParamsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        transfers: '1,3',
      })
    );
  });

  test('dispatches setTransferFilter based on URL params', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('transfers=1,2'), jest.fn()]);

    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );

    expect(dispatchMock).toHaveBeenCalledWith(setTransferFilter([1, 2]));
  });
});
