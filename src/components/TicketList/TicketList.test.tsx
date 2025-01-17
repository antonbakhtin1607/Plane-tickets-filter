import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';

import TicketList from './TicketList';

import { RootState } from '../../redux/store';

const mockStore = configureStore<RootState>();

describe('TicketList Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      tickets: {
        loading: false,
        error: null,
        data: [
          {
            price: 18889,
            carrier: 'YN',
            segments: [
              {
                origin: 'Devonville',
                destination: 'East Monicashire',
                date: '14:54-20:54',
                stops: [],
                duration: '5h 59m',
              },
              {
                origin: 'Shannonview',
                destination: 'Lake Jennifer',
                date: '21:40-02:40',
                stops: ['Johnsonport', 'Port Albert', 'North Jacksonstad'],
                duration: '12h 2m',
              },
            ],
          },
          {
            price: 6633,
            carrier: 'RZ',
            segments: [
              {
                origin: 'North George',
                destination: 'Juliahaven',
                date: '17:46-04:46',
                stops: ['Lisafort'],
                duration: '8h 22m',
              },
              {
                origin: 'Lake William',
                destination: 'Daltonport',
                date: '20:25-01:25',
                stops: ['Harringtonbury', 'Nguyenfort'],
                duration: '8h 5m',
              },
            ],
          },
        ],
        transferFilter: [],
      },
    });
  });

  it('renders loading state', () => {
    store = mockStore({
      tickets: {
        loading: true,
        error: null,
        data: [],
        transferFilter: [1],
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <TicketList />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByText('Loading tickets...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    store = mockStore({
      tickets: {
        loading: false,
        error: 'Something went wrong',
        data: [],
        transferFilter: [1],
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <TicketList />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(
      screen.getByText('Error loading tickets: Something went wrong')
    ).toBeInTheDocument();
  });

  it('renders tickets correctly', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <TicketList />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByText('18889 ₴')).toBeInTheDocument();
    expect(screen.getByText('Devonville - East Monicashire')).toBeInTheDocument();
    expect(screen.getByText('14:54-20:54')).toBeInTheDocument();
    expect(screen.getByText('5h 59m')).toBeInTheDocument();
    expect(screen.getByText('БЕЗ ПЕРЕСАДОК')).toBeInTheDocument();
  });

  it('handles sort button clicks correctly', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <TicketList />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    const cheapestButton = screen.getByText('Самий дешевий');
    const fastestButton = screen.getByText('Самий швидкий');

    fireEvent.click(fastestButton);
    expect(cheapestButton).toHaveStyle('background-color: rgb(255, 255, 255)');
    expect(fastestButton).toHaveStyle('background-color: rgb(33, 150, 243)');
  });

  it('handles pagination correctly when there are enough tickets', () => {
    store = mockStore({
      tickets: {
        loading: false,
        error: null,
        data: [
          { price: 18889, carrier: 'YN', segments: [] },
          { price: 6633, carrier: 'RZ', segments: [] },
          { price: 5000, carrier: 'AA', segments: [] },
          { price: 4000, carrier: 'BB', segments: [] },
          { price: 3000, carrier: 'CC', segments: [] },
          { price: 2000, carrier: 'CC', segments: [] },
        ],
        transferFilter: [],
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <TicketList />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  it('does not render pagination when there are fewer than 5 tickets', () => {
    store = mockStore({
      tickets: {
        loading: false,
        error: null,
        data: [
          { price: 18889, carrier: 'YN', segments: [] },
          { price: 6633, carrier: 'RZ', segments: [] },
        ],
        transferFilter: [1],
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <TicketList />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    const pagination = screen.queryByRole('navigation');
    expect(pagination).toBeNull();
  });

  it('shows no tickets message when filteredTickets is empty', () => {
    store = mockStore({
      tickets: {
        loading: false,
        error: null,
        data: [],
        transferFilter: [1],
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <TicketList />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    expect(
      screen.getByText('Немає квитків, які відповідають вашому запиту')
    ).toBeInTheDocument();
  });
});
