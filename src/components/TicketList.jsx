import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@mui/material';

import {
  StyledButtonGroup,
  TicketBox,
  PriceBox,
  LogoBox,
  SegmentBox,
} from '../styled/StyledTicketList';

import { fetchTicketsRequest } from '../redux/ducks/tickets';
import { styledTheme } from '../theme';
import AirCompanyLogo from '../assets/AirCompanyLogo.png';

const TicketList = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(0);

  const { data, loading, error } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchTicketsRequest());
  }, [dispatch]);

  if (loading) return <Typography>Loading tickets...</Typography>;
  if (error) return <Typography>Error loading tickets: {error}</Typography>;

  return (
    <>
      <StyledButtonGroup variant="contained" aria-label="Basic button group">
        <Button
          onClick={() => setActiveButton(0)}
          fullWidth
          sx={{
            color:
              activeButton === 0
                ? styledTheme.font.white
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
          onClick={() => setActiveButton(1)}
          fullWidth
          sx={{
            color:
              activeButton === 1
                ? styledTheme.font.white
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

      {data.map((ticket, index) => (
        <TicketBox key={index}>
          <PriceBox>{ticket.price} ₴</PriceBox>

          <LogoBox>
            <img src={AirCompanyLogo} alt="Air Company Logo" />
          </LogoBox>

          {ticket.segments.map((segment, segmentIndex) => (
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
    </>
  );
};

export default TicketList;
