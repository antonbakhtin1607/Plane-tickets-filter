import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Pagination } from '@mui/material';
import { useSearchParams } from 'react-router';

import {
  StyledButtonGroup,
  TicketBox,
  PriceBox,
  LogoBox,
  SegmentBox,
} from '../styled/StyledTicketList';

import {
  fetchTicketsRequest,
  sortTicketsByPrice,
  sortTicketsByFastest,
  selectFilteredTickets,
  setTransferFilter,
} from '../redux/ducks/tickets';
import AirCompanyLogo from '../assets/AirCompanyLogo.png'
import { styledTheme } from '../theme';
import { Ticket, Segment } from '../redux/ducks/tickets';
import { RootState } from '../redux/store';

const TicketList: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage: number = 5;

  const [page, setPage] = useState<number>(1);
  const [activeButton, setActiveButton] = useState<number>(0);
  const tickets = useSelector(selectFilteredTickets);
  const { loading, error } = useSelector((state: RootState) => state.tickets);
  const sortParam = searchParams.get('sort') || 'cheapest';

  const paginatedTickets = tickets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchTicketsRequest());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    if (!loading) {
      if (sortParam === 'cheapest') {
        dispatch(sortTicketsByPrice());
        setActiveButton(0);
      } else if (sortParam === 'fastest') {
        dispatch(sortTicketsByFastest());
        setActiveButton(1);
      }
    }
  }, [sortParam, loading, dispatch]);

  useEffect(() => {
    const filters = searchParams.get('transfers');
    if (filters) {
      const filterArray = filters.split(',').map(Number);
      dispatch(setTransferFilter(filterArray));
    }
  }, [dispatch, searchParams]);

  const handleSortChange = (sortType: string) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sort: sortType,
    });
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  if (loading) return <Typography>Loading tickets...</Typography>;
  if (error) return <Typography>Error loading tickets: {error}</Typography>;

  return (
    <>
      <StyledButtonGroup variant="contained" aria-label="Basic button group">
        <Button
          onClick={() => handleSortChange('cheapest')}
          fullWidth
          sx={{
            color:
              activeButton === 0
                ? styledTheme.colors.white
                : styledTheme.font.boldGrey,
            backgroundColor:
              activeButton === 0
                ? styledTheme.colors.blue
                : styledTheme.colors.white,
            fontWeight: 'bold',
            padding: '16px 50px',
          }}
        >
          Самий дешевий
        </Button>

        <Button
          onClick={() => handleSortChange('fastest')}
          fullWidth
          sx={{
            color:
              activeButton === 1
                ? styledTheme.colors.white
                : styledTheme.font.boldGrey,
            backgroundColor:
              activeButton === 1
                ? styledTheme.colors.blue
                : styledTheme.colors.white,
            fontWeight: 'bold',
            padding: '16px 50px',
          }}
        >
          Самий швидкий
        </Button>
      </StyledButtonGroup>

      {paginatedTickets.map((ticket: Ticket, index: number) => (
        <TicketBox key={index}>
          <PriceBox>{`${ticket.price} ₴`}</PriceBox>

          <LogoBox>
            <img src={AirCompanyLogo} alt="Air Company Logo" />
          </LogoBox>

          {ticket.segments.map((segment: Segment, segmentIndex: number) => (
            <React.Fragment key={segmentIndex}>
              <SegmentBox gridColumn="1 / span 1">
                <Typography variant="body2">
                  {segment.origin} - {segment.destination}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: styledTheme.font.boldGrey, fontWeight: 'bold' }}
                >
                  {segment.date}
                </Typography>
              </SegmentBox>

              <SegmentBox gridColumn="2 / span 1">
                <Typography variant="body2">В ДОРОЗІ:</Typography>
                <Typography
                  variant="body1"
                  sx={{ color: styledTheme.font.boldGrey, fontWeight: 'bold' }}
                >
                  {segment.duration}
                </Typography>
              </SegmentBox>

              <SegmentBox gridColumn="3 / span 1">
                {segment.stops.length > 0 ? (
                  <>
                    {segment.stops.length === 1
                      ? '1 ПЕРЕСАДКА:'
                      : `${segment.stops.length} ПЕРЕСАДКИ:`}
                    <Typography
                      variant="body1"
                      sx={{
                        color: styledTheme.font.boldGrey,
                        fontWeight: 'bold',
                      }}
                    >
                      {segment.stops.join(', ')}
                    </Typography>
                  </>
                ) : (
                  'БЕЗ ПЕРЕСАДОК'
                )}
              </SegmentBox>
            </React.Fragment>
          ))}
        </TicketBox>
      ))}

      {paginatedTickets.length === 0 && (
        <Typography>Немає квитків, які відповідають вашому запиту</Typography>
      )}

      {paginatedTickets.length >= itemsPerPage && (
        <Pagination
          count={Math.ceil(tickets.length / itemsPerPage)}
          role="navigation"
          page={page}
          onChange={(_, value) => handlePageChange(value)}
          sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        />
      )}
    </>
  );
};

export default TicketList;
