import styled from 'styled-components';
import { Box, Grid2 } from '@mui/material';

export const StyledAppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const StyledLogoBox = styled(Box)`
  height: 80px;
  margin-bottom: 3;
  margin-top: 3;
`;

export const StyledGridContainer = styled(Grid2)`
  flex-wrap: nowrap;
  container;
  spacing: 2;
  justify-content: center;
  align-items: baseline;
`;

export const StyledGridItem = styled(Grid2)`
  max-width: 580px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
`;
