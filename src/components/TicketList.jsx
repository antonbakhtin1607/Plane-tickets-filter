import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

import {
  StyledButtonGroup,
  TicketBox,
  PriceBox,
  LogoBox,
  SegmentBox,
} from '../styled/StyledTicketList';

import AirCompanyLogo from '../assets/AirCompanyLogo.png';
import testRequest from '../test-request.json';
import { styledTheme } from '../theme';

const TicketList = () => {
  const [activeButton, setActiveButton] = useState(0);

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
            '&.MuiButtonGroup-firstButton': {
              border: 'none',
            },
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

      {testRequest.map((ticket, index) => (
        <TicketBox key={index}>
          <PriceBox>{ticket.price} ₴</PriceBox>

          <LogoBox>
            <img
              src={AirCompanyLogo}
              alt="Air Company Logo"
              style={{ height: '40px' }}
            />
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
                      : '2 ПЕРЕСАДКИ:'}
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
