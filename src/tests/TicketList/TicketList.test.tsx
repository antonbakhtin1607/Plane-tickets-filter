import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';

import TicketList from '../../components/TicketList';

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
            ],
          },
        ],
        transferFilter: [],
      },
    });
  });

  describe('Loading state', () => {
    beforeEach(() => {
      store = mockStore({
        tickets: {
          loading: true,
          error: null,
          data: [],
          transferFilter: [1],
        },
      });
    });

    it('should match snapshot in loading state', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render loading message', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText('Loading tickets...')).toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    beforeEach(() => {
      store = mockStore({
        tickets: {
          loading: false,
          error: 'Something went wrong',
          data: [],
          transferFilter: [1],
        },
      });
    });

    it('should match snapshot in error state', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render error message', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      expect(
        screen.getByText('Error loading tickets: Something went wrong')
      ).toBeInTheDocument();
    });
  });

  describe('Tickets rendering', () => {
    it('should match snapshot when tickets are rendered', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render ticket price', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText('18889 ₴')).toBeInTheDocument();
    });

    it('should render ticket route', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      expect(
        screen.getByText('Devonville - East Monicashire')
      ).toBeInTheDocument();
    });

    it('should render ticket date and duration', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText('14:54-20:54')).toBeInTheDocument();
      expect(screen.getByText('5h 59m')).toBeInTheDocument();
    });

    it('should render ticket stops', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText('БЕЗ ПЕРЕСАДОК')).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    it('should render pagination when there are enough tickets', () => {
      store = mockStore({
        tickets: {
          loading: false,
          error: null,
          data: Array(6).fill({ price: 5000, carrier: 'AA', segments: [] }),
          transferFilter: [],
        },
      });

      render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      const pagination = screen.getByRole('navigation');
      expect(pagination).toBeInTheDocument();
    });

    it('should not render pagination when there are fewer than 5 tickets', () => {
      store = mockStore({
        tickets: {
          loading: false,
          error: null,
          data: [
            { price: 18889, carrier: 'YN', segments: [] },
            { price: 6633, carrier: 'RZ', segments: [] },
          ],
          transferFilter: [],
        },
      });

      render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      const pagination = screen.queryByRole('navigation');
      expect(pagination).toBeNull();
    });
  });

  describe('No tickets message', () => {
    it('should render no tickets message when filteredTickets is empty', () => {
      store = mockStore({
        tickets: {
          loading: false,
          error: null,
          data: [],
          transferFilter: [1],
        },
      });

      render(
        <Provider store={store}>
          <MemoryRouter>
            <TicketList />
          </MemoryRouter>
        </Provider>
      );

      expect(
        screen.getByText('Немає квитків, які відповідають вашому запиту')
      ).toBeInTheDocument();
    });
  });
});
