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
  margin-bottom: 24px;
  margin-top: 24px;
`;

export const StyledGridContainer = styled(Grid2)`
  flex-wrap: nowrap;
  container;
  justify-content: center;
  align-items: baseline;
`;

type StyledGridItemProps = {
  backgroundColor?: string;
  xs: number | boolean;
};

export const StyledGridItem = styled(Grid2)<StyledGridItemProps>`
  max-width: 580px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
`;
