import styled from 'styled-components';
import { Box, ButtonGroup } from '@mui/material';

import { styledTheme } from '../theme';

export const TicketBox = styled(Box)`
  display: grid;
  margin-bottom: 20px;
  background-color: ${styledTheme.colors.white};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  grid-template-columns: repeat(3, 1fr);
  gap: 10px 26px;
  grid-template-areas: 'price . logo' 'destination duration stops';
`;

export const PriceBox = styled(Box)`
  grid-area: price;
  font-weight: bold;
  font-size: 1.4rem;
  color: ${styledTheme.font.blue};
  align-self: center;
`;

export const LogoBox = styled(Box)`
  grid-area: logo;
  display: flex;
  justify-content: flex-start;
`;

type SegmentBoxProps = {
  area?: string;
};

export const SegmentBox = styled(Box)<SegmentBoxProps>`
  grid-area: ${({ area }) => area};
`;

export const StyledButtonGroup = styled(ButtonGroup)`
  margin-bottom: 20px;
  width: 100%;
`;
