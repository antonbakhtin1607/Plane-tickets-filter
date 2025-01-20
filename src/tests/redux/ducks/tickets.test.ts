import ticketsReducer, {
  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsFailure,
  setTransferFilter,
  sortTicketsByPrice,
  sortTicketsByFastest,
  selectFilteredTickets,
  Ticket,
} from '../../../redux/ducks/tickets';

describe('ticketsSlice', () => {
  const initialState = {
    data: [],
    loading: false,
    error: null,
    transferFilter: [],
  };

  const mockTickets: Ticket[] = [
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
  ];

  it('should handle fetchTicketsRequest', () => {
    const action = fetchTicketsRequest();
    const nextState = ticketsReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchTicketsSuccess', () => {
    const action = fetchTicketsSuccess(mockTickets);
    const nextState = ticketsReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.data).toEqual(mockTickets);
  });

  it('should handle fetchTicketsFailure', () => {
    const action = fetchTicketsFailure('Network error');
    const nextState = ticketsReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Network error');
  });

  it('should handle setTransferFilter', () => {
    const action = setTransferFilter([1]);
    const nextState = ticketsReducer(initialState, action);
    expect(nextState.transferFilter).toEqual([1]);
  });

  it('should sort tickets by price', () => {
    const action = sortTicketsByPrice();
    const nextState = ticketsReducer(
      { ...initialState, data: mockTickets },
      action
    );
    expect(nextState.data[0].price).toBe(6633);
    expect(nextState.data[1].price).toBe(18889);
  });

  it('should sort tickets by fastest', () => {
    const action = sortTicketsByFastest();
    const nextState = ticketsReducer(
      { ...initialState, data: mockTickets },
      action
    );
    const totalDurationA = mockTickets[0].segments.reduce(
      (acc, segment) => acc + parseDuration(segment.duration),
      0
    );
    const totalDurationB = mockTickets[1].segments.reduce(
      (acc, segment) => acc + parseDuration(segment.duration),
      0
    );
    expect(totalDurationA < totalDurationB).toBe(false);
  });

  it('should return filtered tickets based on transferFilter', () => {
    const action = setTransferFilter([1]);
    const filteredTickets = selectFilteredTickets({
      tickets: { ...initialState, data: mockTickets, transferFilter: [1] },
    });

    expect(filteredTickets.length).toBe(0);
  });

  it('should return all tickets if no transferFilter is set', () => {
    const filteredTickets = selectFilteredTickets({
      tickets: { ...initialState, data: mockTickets, transferFilter: [] },
    });
    expect(filteredTickets.length).toBe(2);
  });
});

function parseDuration(duration: string): number {
  const [hours, minutes] = duration
    .split('h ')
    .map((part) => parseInt(part, 10));
  return hours * 60 + minutes;
}
