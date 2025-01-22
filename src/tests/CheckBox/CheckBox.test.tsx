import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useSearchParams } from 'react-router';

import CheckBox from '../../components/CheckBox';

import { createMockStore } from '../__mocks__/mockStore';
import { setTransferFilter } from '../../redux/ducks/tickets';

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
        transferFilter: [1, 2],
        data: [],
        loading: false,
        error: null,
      },
    });
    store.dispatch = dispatchMock;
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      jest.fn(),
    ]);
  });

  test('should render header text', () => {
    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );
    expect(screen.getByText('Кількість пересадок')).toBeInTheDocument();
  });

  test('should render "Все" checkbox', () => {
    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );
    expect(screen.getByLabelText('Все')).toBeInTheDocument();
  });

  test('should render "Без пересадок" checkbox', () => {
    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );
    expect(screen.getByLabelText('Без пересадок')).toBeInTheDocument();
  });

  test('should render "1 пересадка" checkbox', () => {
    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );
    expect(screen.getByLabelText('1 пересадка')).toBeInTheDocument();
  });

  test('should render "2 пересадки" checkbox', () => {
    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );
    expect(screen.getByLabelText('2 пересадки')).toBeInTheDocument();
  });

  test('should render "3 пересадки" checkbox', () => {
    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );
    expect(screen.getByLabelText('3 пересадки')).toBeInTheDocument();
  });

  test('should dispatch setTransferFilter when a checkbox is clicked', () => {
    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/2 пересадки/i));
    expect(dispatchMock).toHaveBeenCalledWith(setTransferFilter([1, 2]));
  });

  test('should update URL search params when checkbox is clicked', () => {
    const setSearchParamsMock = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      setSearchParamsMock,
    ]);

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

  test('should dispatch setTransferFilter based on URL params', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('transfers=1,2'),
      jest.fn(),
    ]);

    render(
      <Provider store={store}>
        <CheckBox />
      </Provider>
    );

    expect(dispatchMock).toHaveBeenCalledWith(setTransferFilter([1, 2]));
  });
});
